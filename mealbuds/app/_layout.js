// import { Stack } from "expo-router";

// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" />
//     </Stack>
//   );
// }
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index"></Tabs.Screen>
      <Tabs.Screen name="messages"></Tabs.Screen>
      <Tabs.Screen name="profile"></Tabs.Screen>
    </Tabs>
  );
}
