import Nullstack from 'nullstack'

import LoadingScreen from './LoadingScreen'

class Password extends Nullstack {

  hasPassword = null
  user = null

  password = ''

  error = ''

  static async checkLogin({ db, password, userId }) {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: {
        WhoToSend: 1,
      },
    })

    console.log(user.password)

    if (user.password) {
      if (password === user.password) {
        delete user.password
        return user
      }
      return { error: 'Senha incorreta :(' }
    }
    // Update user's password
    await db.user.update({
      data: {
        password,
      },
      where: {
        id: parseInt(userId),
      },
    })
    return user
  }

  static async getUser({ db, userId }) {
    const user = await db.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    })

    return { ...user, password: !!user.password }
  }

  async initiate({ params }) {
    const user = await this.getUser({ userId: params.id })
    this.hasPassword = user.password
    this.user = user
  }

  async doLogin(context) {
    const { params } = context
    const response = await this.checkLogin({
      password: this.password,
      userId: params.id,
    })

    if (!response.error) {
      context.me = response
      context.router.path = '/getPrize'
    } else {
      this.error = 'Senha errada 😭'
    }
  }

  renderLogin() {
    return (
      <div class="w-full">
        <p class="text-2xl">
          Oi de novo {this.user.name}!
          <br />
          <br />
          Por favor, insira a senha, se esqueceu, fala com o Rogerinho 😆
        </p>
        <input bind={this.password} class="w-full px-2 text-xl rounded-md mt-6" type="text" placeholder="Senha" />
        {this.error && <p class="text-dark-red font-medium">Oh não, parece que você errou a senha, tente de novo!</p>}
        <button onclick={this.doLogin} class="w-full mt-4">
          Entrar
        </button>
      </div>
    )
  }

  renderCreatePassword() {
    return (
      <>
        <p class="text-2xl text-white">
          Oi {this.user.name}!! <br /> <br /> Quase lá! Antes de tudo, vamos criar uma senha? <br /> <br /> Só para o
          caso <s>da madrinha</s> de alguém curioso querer ver o seu amigo secreto 🤓
          <br />
          <br />
          <span class="font-normal">
            Sem esquecer a senha hein <s>mãe, tio Kaô</s>?
          </span>
        </p>
        <input
          bind={this.password}
          class="w-full px-2 text-xl rounded-md mt-1"
          type="text"
          placeholder="Digite a senha"
        />
        <br />
        <button onclick={this.doLogin} class="w-full">
          Entrar
        </button>
      </>
    )
  }

  render() {
    return (
      <>
        {this.hasPassword === null ? (
          <LoadingScreen />
        ) : (
          <section class="h-screen w-full flex items-center justify-center">
            <div class="flex flex-col items-center gap-2 max-w-lg">
              {this.hasPassword ? <Login /> : <CreatePassword />}
            </div>
          </section>
        )}
      </>
    )
  }

}

export default Password
