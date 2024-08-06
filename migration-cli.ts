import inquirer from 'inquirer';
import { execSync } from 'child_process';

const runCommand = (command: string) => {
  try {
    console.log(`Executing: ${command}`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

(async () => {
  const { action } = await inquirer.prompt(
    {
      type: 'list',
      name: 'action',
      message: {
        message: 'Select a migration action:',
      },
      choices: [
        'Create Migration',
        'Generate Migration',
        'Run Migrations',
        'Revert Migrations',
      ],
    },
  );

  const { name } = action === 'Generate Migration' || action === 'Create Migration'
    ? await inquirer.prompt(
      {
        type: 'input',
        name: 'name',
        required: true,
        message: {
          message: 'Enter the migration name:',
        },
        validate: (input: boolean | string) => input ? true : 'Migration name is required',
      },
    )
    : { name: '' };

  switch (action) {
    case 'Create Migration':
      runCommand(`pnpm run typeorm migration:create src/migrations/${name}`);
      break;
    case 'Generate Migration':
      runCommand(`pnpm run typeorm migration:generate src/migrations/${name} -d ./src/data-source.ts`);
      break;
    case 'Run Migrations':
      runCommand('pnpm run typeorm migration:run -d ./src/data-source.ts');
      break;
    case 'Revert Migrations':
      runCommand('pnpm run typeorm migration:revert -d ./src/data-source.ts');
      break;
  }
})();
