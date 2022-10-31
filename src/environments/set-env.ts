const setEnv = () => {
    const fs = require('fs');
    const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
    const targetPath = './src/environments/environment.ts';
  // Load node modules
    const colors = require('colors');
    const appVersion = require('../../package.json').version;
    require('dotenv').config({
      path: 'src/environments/.env'
    });
  // `environment.ts` file structure
    const envConfigFile = `export const environment = {
    MAPS_API: '${process.env["MAPS_API"]}',
    S3_ACCESS_KEY: '${process.env["S3_ACCESS_KEY"]}',
    S3_SECRET_ACCESS_KEY: '${process.env["S3_SECRET_ACCESS_KEY"]}',
    production: true,
  };
  `;
    console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
    console.log(colors.grey(envConfigFile));
    writeFile(targetPath, envConfigFile, (err:any) => {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
      }
    });
  };
  
  setEnv();