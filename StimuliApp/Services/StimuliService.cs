using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;


namespace StimuliApp.Services;

public class StimuliService
{
    private readonly StimuliAppContext _context;
    private readonly IConfiguration _configuration;

public StimuliService(StimuliAppContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;

    }

    public IEnumerable<Stimuli> GetAll()
    {
        return _context.Stimuli
        .AsNoTracking()
        .ToList();
    }

    public Stimuli? GetById(int id)
    {
        return _context.Stimuli
        .Include(p => p.StimSets)
        .Include(p => p.Item)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public Stimuli? Create(Stimuli newStim)
    {
        _context.Stimuli.Add(newStim);
        _context.SaveChanges();
        return newStim;
    }

    public async Task UpdateAsync(Stimuli updatedStim, IFormFile? file = null)
    {
        var stimuliUpdating = _context.Stimuli.Find(updatedStim.Id);
        if(stimuliUpdating is null)
        {
            throw new InvalidOperationException("Stimuli doesn't exist");
        }

        stimuliUpdating.StimName = updatedStim.StimName ?? stimuliUpdating.StimName;
        stimuliUpdating.Image = updatedStim.Image ?? stimuliUpdating.Image;
        stimuliUpdating.ItemId = updatedStim.ItemId ?? stimuliUpdating.ItemId;

        // Check if a file has been provided and upload it to S3 if so
        if (file != null)
        {
            string imageUrl = await UploadImageToS3Async(file);
            stimuliUpdating.Image = imageUrl;
        }
        _context.Entry(stimuliUpdating).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public bool StimuliExists(int id)
    {
        return _context.Stimuli.Any(e => e.Id == id);
    }
    
    public bool AddStimSet(int stimId, int setId)
    {
        var updatingStim = _context.Stimuli.Find(stimId);
        var updatingSet = _context.StimSets.Find(setId);
        if (updatingSet is null || updatingStim is null)
        {
            throw new InvalidOperationException("Stimuli or stimset doesn't exist");

        }

        if(updatingStim.StimSets is null)
        {
            updatingStim.StimSets = new List<StimSet>();
        }

        updatingStim.StimSets.Add(updatingSet);
        _context.SaveChanges();
        return true;
    }

    public void DeleteById(int id)
    {
        var updatedStim = _context.Stimuli.Find(id);
        if(updatedStim is not null)
        {
            _context.Stimuli.Remove(updatedStim);
            _context.SaveChanges();
        }
    }

    public async Task<string> UploadImageToS3Async(IFormFile file)
    {
        var accessKey = _configuration.GetValue<string>("AWS:AccessKeyId");
        var secretKey = _configuration.GetValue<string>("AWS:SecretAccessKey");
        var region = _configuration.GetValue<string>("AWS:Region");
        var bucketName = _configuration.GetValue<string>("AWS:BucketName");

        // Create an AmazonS3Client using the retrieved credentials and region
        var s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        var transferUtility = new TransferUtility(s3Client);

        var uploadRequest = new TransferUtilityUploadRequest
        {
            BucketName = bucketName, 
            Key = file.FileName,
            InputStream = file.OpenReadStream()
        };

        await transferUtility.UploadAsync(uploadRequest);

        // Return the URL or key of the uploaded image
        return $"https://{uploadRequest.BucketName}.s3.amazonaws.com/{uploadRequest.Key}";
    }

}