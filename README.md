# Med-IA

Med'IA website source code

### For the db, in /api folder :

```bash
  mysql -u root -pMath0623736244 -e "CREATE DATABASE media_db;"
```

if error, change your password to Math0623736244 (in mysql commandline, type
`ALTER USER 'root'@'localhost' IDENTIFIED BY 'Math0623736244';`
) and rerun the command

then :

```bash
npx sequelize-cli db:migrate
```

to create the tables
