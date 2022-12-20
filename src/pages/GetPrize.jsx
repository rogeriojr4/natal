import Nullstack from "nullstack";

import LoadingScreen from "./LoadingScreen";

class GetPrize extends Nullstack {
  static async randomizePrize({ me, db }) {
    // Get all sent
    const allSent = await db.whoToSend.findMany();

    // Get all users
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const alreadyReceivers = allSent.map((sent) => sent.receiverId);

    const senders = allSent.map((sent) => sent.senderId);

    if (senders.includes(me.id)) throw new Error("Cannot do this!");

    const noReceivers = users
      .filter((user) => !alreadyReceivers.includes(user.id))
      .map((user) => user.id);

    const noSenders = users
      .filter((user) => !senders.includes(user.id))
      .map((user) => user.id);

    let userToSend = -1;

    if (users.length - alreadyReceivers.length === 2) {
      // Check if the user has already got their prize

      console.log(noSenders, noReceivers);

      if (noSenders.includes(noReceivers[0])) {
        if (me.id !== noReceivers[0]) {
          userToSend = noReceivers[0];
        } else {
          userToSend = noReceivers[1];
        }
      } else if (noSenders.includes(noReceivers[1])) {
        if (me.id !== noReceivers[1]) {
          userToSend = noReceivers[1];
        } else {
          userToSend = noReceivers[0];
        }
      }
    }

    if (userToSend === -1) {
      const noReceiversWithoutMe = noReceivers.filter(
        (nonReceiver) => nonReceiver !== me.id
      );

      const randomIndex = Math.floor(
        Math.random() * noReceiversWithoutMe.length
      );

      const id = noReceiversWithoutMe[randomIndex];

      userToSend = users.find((user) => user.id === id).id;
    }

    await db.whoToSend.create({
      data: {
        receiverId: userToSend,
        senderId: me.id,
      },
    });

    return users.find((user) => user.id === userToSend);
  }

  static async getAlreadySent({ me, db }) {
    const whoSent = await db.whoToSend.findFirst({
      where: {
        senderId: parseInt(me.id),
      },
    });
    if (!whoSent) return {};

    return await db.user.findFirst({
      where: {
        id: whoSent.receiverId,
      },
    });
  }

  async hydrate({ me }) {
    const receiver = await this.getAlreadySent({ me });
    if (receiver) {
      this.receiverName = receiver.name;
    }
    this.loading = false;
  }

  receiverName = "";

  loading = true;

  render({ me, router }) {
    if (!me) router.path = "/";
    return (
      <>
        {this.loading ? (
          <LoadingScreen />
        ) : this.receiverName ? (
          <section class="h-screen w-full flex items-center justify-center">
            <div class="flex flex-col items-center gap-2 max-w-lg">
              <p class="text-5xl text-center">Seu amigo secreto é...</p>
              <br />
              <br />
              <h1 class="text-6xl font-bold">{this.receiverName}!!</h1>
            </div>{" "}
          </section>
        ) : (
          <section class="h-screen w-full flex items-center justify-center">
            <div class="flex flex-col items-center gap-2 max-w-lg">
              <p class="text-4xl">
                Chegou a hora! <br />
                <br /> Clique para descobrir o(a) sortudo(a)
              </p>
              <button
                class="text-4xl mt-8 w-full"
                onclick={async () => {
                  console.log("me", me);
                  this.loading = true;
                  const receiver = await this.randomizePrize({ me });
                  this.receiverName = receiver.name;
                  setTimeout(() => {
                    this.loading = false;
                  }, 5000);
                }}
              >
                Vamos lá !
              </button>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default GetPrize;
