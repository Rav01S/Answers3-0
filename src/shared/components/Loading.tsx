"use client";

import { PropsWithChildren } from "react";

export default function Loading(props: PropsWithChildren) {
  return (
    <>
      <p>{props.children || "Загрузка..."}</p>
    </>
  );
}
