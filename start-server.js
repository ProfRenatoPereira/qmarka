const { exec } = require('child_process');

exec('json-server --watch db.json', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao iniciar o servidor JSON: ${error}`);
    return;
  }
  console.log(`Servidor JSON iniciado: ${stdout}`);
});