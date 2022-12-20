import Nullstack from "nullstack";

class Home extends Nullstack {
  users = [];

  userId = 0;

  static async getUsers({ db }) {
    return db.user.findMany({
      select: {
        name: true,
        id: true,
      },
    });
  }

  prepare({ page }) {
    page.title = `Amigo Secreto da Família Dondon`;
    page.description = `Entre e tire seu amigo secreto!`;
  }

  async initiate() {
    this.users = await this.getUsers();
  }

  render() {
    return (
      <section class="h-screen w-full flex items-center justify-center">
        <div class="flex flex-col items-center gap-2 max-w-lg">
          <h1 class="font-bold text-6xl text-center">Família Dondon</h1>
          <h1 class="text-2xl">Amigo Secreto</h1>
          <p class="mt-6 w-full text-left text-xl">Quem tá aí?</p>
          <select bind={this.userId} class="border w-full text-3xl">
            <option value="0">Selecione</option>
            {this.users.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          <a
            path="/login"
            params={{ id: this.userId }}
            class="text-2xl font-bold w-full mt-6 text-center"
          >
            Pronto
          </a>
        </div>
      </section>
    );
  }
}

export default Home;
