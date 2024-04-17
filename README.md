[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
   # Stimuli App

   ## Description
   
   This app was created to serve as a tool for behavior analysts and behaviors techs for running programs that incorportate receptive (touching correct stimuli) and tacting (verbally saying the correct stimuli) goals and that replaces the physical need of stimuli. This app allows for grouping stimuli and creating a Stimuli Set. Using this Stimuli Set a tech/analyst can perform intenstive trial training (IIT) with their client. Once a trial is ran the client's results are persisted and showcased to the user for easy readings and graphed to track client mastery. 

   This app has two separate views. One is as a tech where the user can still create/update stimuli, stimuli sets, and run trials. The other view is through an analyst, where the admin can do the same but also access all crud operations with users, clients, stimuli, and stimuli sets. The admin view is accessible via creating a user whose email that ends with ___'@admin.com'___ for current simplicity.

    Due to the current state a user would have to be created via the built in swagger crud handler.


   
   ## Table of contents
   
   - [Installation](#installation)
   - [License](#license)
   - [Questions](#questions)
   
   
   ## Installation

   This application uses a react and vite frontend. For the backend the app uses dotnet web api, Sql server, and entitfy framework as the orm. To access these Microsoft tools I had to use Docker to grab azure-sql-edge to use Sql server and Azure data Studio on my Mac. For the sql database I had to use Azure Data Studio and grabbed the connection string from there. An appsettings.json.example file was created for example of EVs. 
   Amazon s3 was implemented to handle file storage.
   

   Here is what the landing page would look like: 
   ![landing page](/images/landingPage.png)

   When selecting a client, the client page will be rendered and displays that client's associated stimuli sets, when there, the user can configure the trial for that client: 
    ![client page](/images/TrialConfig.png)
Here is what a trial would consist of and run, dependent on user input: 
    ![trial page](/images/trial.png)
    And when the trial is completed: 
    ![trial page](/images/trialComplete.png)
    If the trial is saved then the user will be navigated to the client's data page displaying the client's previous trials. There the user can also see a graph of previous results: 
    ![trial page](/images/DataPage.png)
    Here is what the stimuli page would look like: 
    ![trial page](/images/stimuliPage.png)
    Here is the Admin view: 
    ![trial page](/images/adminView.png)





   
   ## Questions
    
If you have any questions please contact me at: 
   
davidcarvajal008@gmail.com
   
Find me on github at: [Luis00809](https://github.com/Luis00809)
   
   