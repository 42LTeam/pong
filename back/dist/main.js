"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_1.setupSwagger)(app);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use(session({
        cookie: {
            maxAge: 3600000 * 24
        },
        secret: "J'aime les hommes",
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map