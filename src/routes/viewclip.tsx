const ViewClip: Component<{}, { id: string }> = function () {
  return <h1>You would be viewing clip id {use(this.id)} right now</h1>;
};

export default ViewClip;