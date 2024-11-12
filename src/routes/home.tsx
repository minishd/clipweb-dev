import { Link } from "dreamland-router";

type FakeClipMetadata = {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  views: number;
};

function shuffle(array: FakeClipMetadata[]) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const fakeClips: FakeClipMetadata[] = [
  new Array(7).fill({
    id: "QBztqS0J",
    title: "some clip random clip",
    author: "min2",
    thumbnail: "https://picture.wtf/p/sRxZll.png",
    views: 180,
  }),
  new Array(7).fill({
    id: "6xjvVw3s",
    title: "Some other entry",
    author: "user789127",
    thumbnail: "https://picture.wtf/p/j3ASVX.jpg",
    views: 97,
  }),
].flat();

shuffle(fakeClips);

const Clip: Component<{ meta: FakeClipMetadata }> = function () {
  return (
    <div>
      <Link href={`/c/${this.meta.id}`}>
        <div class="aspect-w-16 aspect-h-9 mb-1 ring-1 hover:ring-2 ring-zinc-50">
          <img class="object-cover" src={this.meta.thumbnail} />
        </div>
        <p class="text-sm font-bold text-zinc-50">{this.meta.title}</p>
      </Link>
      <p class="text-xs font-normal text-zinc-200">
        viewed {use(this.meta.views)} times — by{" "}
        <Link class="hl" href="/u/123">
          {this.meta.author}
        </Link>
      </p>
    </div>
  );
};

const Clips: Component<{ clips: FakeClipMetadata[] }> = function () {
  return (
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5 p-5">
      {this.clips.map((meta) => (
        <Clip meta={meta} />
      ))}
    </div>
  );
};

const Home: Component = function () {
  return (
    <div>
      <Clips clips={fakeClips} />
      <Link class="hl" href="/login"><p>test link for login</p></Link>
      <Link class="hl" href="/thisshould404"><p>clicking this should 404</p></Link>
    </div>
  );
};

export default Home;
