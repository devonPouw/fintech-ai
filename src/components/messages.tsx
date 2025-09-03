import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

export function Messages() {
  return (
    <div className="space-y-4">
      <Message>
        <MessageAvatar src="https://github.com/ibelick.png" alt="Ibelick" />
        <MessageContent
          markdown
          className="prose-h2:mt-0! prose-h2:scroll-m-0! dark:prose-invert"
        >
          {`## Hello World!
          
This message supports **bold text**, *italics*, and other Markdown features:

- Bullet points
- Code blocks
- [Links](https://example.com)

\`\`\`js
// Even code with syntax highlighting
function hello() {
  return "world";
}
\`\`\`
          `}
        </MessageContent>
      </Message>
    </div>
  );
}
