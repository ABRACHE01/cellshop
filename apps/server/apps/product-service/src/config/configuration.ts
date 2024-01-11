export default () => ({
  port: Number(process.env.PORT) || 5050,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
    // entities: ['dist/entities/*.entity.{ts,js}', 'src/entities/*.entity.{ts,js}'],
    entities: [__dirname + '/../**/*.entity.{js,ts}']

  },
});
