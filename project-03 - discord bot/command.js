const { REST, Routes } = require ('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken('MTIzODc2ODY3MDA5NzAxODkyMQ.GucCUF.EC694DXbv3idz6eozGmyD3dC7T-GvTtcQHnCGE');


(async () => {
    try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands('1238768670097018921'), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();