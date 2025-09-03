import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

export function Messages() {
  return (
    <div className="space-y-4 max-w-(--breakpoint-xl)">
      <Message className="justify-start">
        <MessageAvatar src="https://github.com/ibelick.png" alt="Ibelick" />
        <MessageContent
          markdown
          className="prose-h2:mt-0! prose-h2:scroll-m-0! dark:prose-invert"
        >
          {`Hallo World`}
        </MessageContent>
      </Message>
      <Message className="justify-end">
        <MessageAvatar src="https://github.com/ibelick.png" alt="Ibelick" />
        <MessageContent
          markdown
          className="prose-h2:mt-0! prose-h2:scroll-m-0! dark:prose-invert"
        >
          {`Hallo World`}
        </MessageContent>
      </Message>
    </div>
  );
}
