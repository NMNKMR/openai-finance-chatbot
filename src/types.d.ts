interface IMessage {
  id: string;
  role: "user" | "assistant";
  content: [
    {
      type: string;
      text: {
        value: string;
        annotations: Array;
      };
    }
  ];
}
