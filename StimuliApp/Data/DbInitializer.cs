using StimuliApp.Models;

namespace StimuliApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StimuliAppContext context)
        {
            if(context.Clients.Any()
            && context.Users.Any()
            && context.Stimuli.Any()
            && context.StimSets.Any())
            {
                return; //DB has been created
            }

            var user1 = new User {FirstName = "John",LastName = "Doe",Email = "john.doe@example.com",Password = "securepassword"};
            var user2 = new User { FirstName = "Jane", LastName = "Doe", Email = "jane.doe@example.com", Password = "password456" };
            var user3 = new User { FirstName = "Jim", LastName = "Smith", Email = "jim.smith@example.com", Password = "password789" };
            var user4 = new User { FirstName = "Jill", LastName = "Smith", Email = "jill.smith@example.com", Password = "password012" };

            var client1 = new Client { Name = "Client  1", Users = new List<User> { user1, user2 } };
            var client2 = new Client { Name = "Client  2", Users = new List<User> { user3, user4 } };
            var client3 = new Client { Name = "Client  3", Users = new List<User> { user1, user3 } };
            var client4 = new Client { Name = "Client  4", Users = new List<User> { user2, user4 } };

            var stimSet1 = new StimSet { Title = "StimSet  1", Clients = new List<Client> { client1, client2 } };
            var stimSet2 = new StimSet { Title = "StimSet  2", Clients = new List<Client> { client3, client4 } };
            var stimSet3 = new StimSet { Title = "StimSet  3", Clients = new List<Client> { client1, client3 } };
            var stimSet4 = new StimSet { Title = "StimSet  4", Clients = new List<Client> { client2, client4 } };

            var stimuli1 = new Stimuli { Name = "Stimuli  1", StimSets = new List<StimSet> { stimSet1, stimSet2 } };
            var stimuli2 = new Stimuli { Name = "Stimuli  2", StimSets = new List<StimSet> { stimSet3, stimSet4 } };
            var stimuli3 = new Stimuli { Name = "Stimuli  3", StimSets = new List<StimSet> { stimSet1, stimSet3 } };
            var stimuli4 = new Stimuli { Name = "Stimuli  4", StimSets = new List<StimSet> { stimSet2, stimSet4 } };

            context.SaveChanges();
        }
    }
}