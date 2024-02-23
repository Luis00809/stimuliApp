using StimuliApp.Models;

namespace StimuliApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StimuliAppContext context)
        {
            try
            {
                if (context.Clients.Any()
                    && context.Users.Any()
                    && context.Stimuli.Any()
                    && context.StimSets.Any())
                {
                    return; // DB has been created
                }

                var users = new List<User>
                {
                    new User { FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", Password = "securepassword" },
                    new User { FirstName = "Jane", LastName = "Doe", Email = "jane.doe@example.com", Password = "password456" },
                    new User { FirstName = "Jim", LastName = "Smith", Email = "jim.smith@example.com", Password = "password789" },
                    new User { FirstName = "Jill", LastName = "Smith", Email = "jill.smith@example.com", Password = "password012" }
                };

                var clients = new List<Client>
                {
                    new Client { Name = "Client  1", Users = users.Take(2).ToList() },
                    new Client { Name = "Client  2", Users = users.Skip(2).Take(2).ToList() }
                };

                var stimSets = new List<StimSet>
                {
                    new StimSet { Title = "StimSet  1", Clients = clients.Take(2).ToList() },
                    new StimSet { Title = "StimSet  2", Clients = clients.Skip(2).Take(2).ToList() }
                };

                var stimuli = new List<Stimuli>
                {
                    new Stimuli { Name = "Stimuli  1", StimSets = stimSets.Take(2).ToList() },
                    new Stimuli { Name = "Stimuli  2", StimSets = stimSets.Skip(2).Take(2).ToList() }
                };

                context.Clients.AddRange(clients);
                context.Users.AddRange(users);
                context.StimSets.AddRange(stimSets);
                context.Stimuli.AddRange(stimuli);

                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while initializing the database: {ex.Message}");
            }
        }
    }
}
