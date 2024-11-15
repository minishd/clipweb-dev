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
  new Array(6).fill({
    id: "QBztqS0J",
    title: "some clip random clip",
    author: "min2",
    thumbnail: "https://picture.wtf/p/sRxZll.png",
    views: 180,
  }),
  new Array(5).fill({
    id: "6xjvVw3s",
    title: "Some other entry",
    author: "user789127",
    thumbnail: "https://picture.wtf/p/j3ASVX.jpg",
    views: 97,
  }),
  new Array(6).fill({
    id: "qtRAQMgG",
    title: "hi w0rldd",
    author: "m11nish",
    thumbnail: "https://picture.wtf/p/cNMv2L.jpg",
    views: 504,
  }),
].flat();

shuffle(fakeClips);

const Clip: Component<{ meta: FakeClipMetadata }> = function () {
  return (
    <div>
      <Link href={`/c/${this.meta.id}`}>
        <div class="aspect-w-16 aspect-h-9 mb-1 ring-1 hover:ring-2 ring-zinc-50 cursor-default">
          <img class="object-cover" src={this.meta.thumbnail} alt="" />
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
    <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5">
      {this.clips.map((meta) => (
        <Clip meta={meta} />
      ))}
    </div>
  );
};

const Search: Component = function () {
  return (
    <div class="flex gap-4 mb-1">
      <div>
        <div>
          <input
            type="text"
            placeholder="search with tags.."
            class="mb-2 flex-1"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="search anything.."
            class="mb-2 flex-1"
          />
        </div>
      </div>
    </div>
  );
};

const Sort: Component = function () {
  return (
    <div>
      <h1 class="text-lg font-semibold">Tags</h1>
      <ul class="text-2md">
        <li>
          <strong>+ -</strong> valorant
        </li>
        <li>
          <strong>+ -</strong> pie
        </li>
        <li>
          <strong>+ -</strong> nword
        </li>
        <li>
          <strong>+ -</strong> minecraft
        </li>
        <li>
          <strong>+ -</strong> hypixel
        </li>
        <li>
          <strong>+ -</strong> skywars
        </li>
      </ul>
    </div>
  );
};

const Home: Component = function () {
  return (
    <div class="p-5">
      <h1 class="text-xl font-bold pb-2">clip album</h1>
      <div class="flex gap-3">
        <div>
          <Search />
          <Sort />
          <br />
          <button on:click={() => document.write("💥💥💥💥💥💥")}>iran nuke button</button>
        </div>
        <div class="flex-1 pt-[1px]">
          <Clips clips={fakeClips} />
        </div>
      </div>
      <div class="absolute bottom-0 left-0 p-2">
        <Link class="hl" href="/login">
          <p>test link for login</p>
        </Link>
        <Link class="hl" href="/thisshould404">
          <p>clicking this should 404</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
