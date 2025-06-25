import { Provider } from "@/components/ui/provider"
import { PostsProvider } from "@/context/PostsContext"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <PostsProvider>{children}</PostsProvider>
        </Provider>
      </body>
    </html>
  )
}