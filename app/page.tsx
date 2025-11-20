'use client';

import { Suspense } from "react";
import HomePageClientComponent from "./client-component";

export default function Home() {
  return (
    <Suspense>
      <HomePageClientComponent/>
    </Suspense>
  )
}