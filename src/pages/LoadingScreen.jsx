import Nullstack from 'nullstack'

class LoadingScreen extends Nullstack {

  render() {
    return (
      <section class="w-full h-screen justify-center items-center flex flex-col">
        <img src="./animation_500_lbu6was9.gif" alt="" />
        <h1 class="text-5xl">Carregando...</h1>
      </section>
    )
  }

}

export default LoadingScreen
