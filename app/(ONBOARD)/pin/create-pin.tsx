import PinScreen from "@/lib/components/shared/PinScreen";
import { router } from "expo-router";

export default function CreatePIN() {
  return (
    <PinScreen
      title="Create New PIN"
      mode="create"
      nextRoute="/(ONBOARD)/pin/confirm-pin"
      onSubmit={(enteredPin) => {
        if (typeof enteredPin === "string") {
          router.push({
            pathname: "/(ONBOARD)/pin/confirm-pin",
            params: { pin: enteredPin },
          } as const);
        }
      }}
    />
  );
}
