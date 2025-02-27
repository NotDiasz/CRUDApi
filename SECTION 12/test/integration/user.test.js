const database = require("../../src/database");
const serviceUser = require("../../src/services/user");

describe("Teste de usuários", () => {
    let transaction;
    let userId;

    beforeAll(async () => {
        transaction = await database.db.transaction();
    });

    afterAll(async () => {
        await transaction.rollback();
    });

    it("Should create a user", async () => {
        const user = {
            email: "django22@gmail.com",
            password: "123456", // Se for criptografada, o retorno será diferente
        };

        const addUser = await serviceUser.Create(user.email, user.password, transaction);
        userId = addUser.id;

        expect(addUser.email).toBe(user.email);
        expect(addUser.password).toBeDefined(); // Se for hash, não comparar diretamente
    });

    it("Should update a user", async () => {
        const updatedUser = {
            id: userId,
            email: "django22alterado@gmail.com",
            password: "123456",
        };

        const updateUser = await serviceUser.Update(
            updatedUser.id,
            updatedUser.email,
            updatedUser.password,
            transaction
        );

        expect(updateUser.email).toBe(updatedUser.email);
        expect(updateUser.password).toBeDefined();
    });

    it("Should delete a user", async () => {
        const response = await serviceUser.Delete(userId, transaction);

        expect(response).toBe(true);
    });
});
