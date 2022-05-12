import { useState } from "react";

export default function useAppBar() {
  const [title, setTitle] = useState("");
  const [hasBackButton, setUseBackButton] = useState(false);

  const configAppBar = (newTitle, useBackButton) => {
    setTitle(newTitle);
    setUseBackButton(useBackButton);
  };

  return { title, hasBackButton, configAppBar };
}
