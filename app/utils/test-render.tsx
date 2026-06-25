import { render as testingLibraryRender } from '@testing-library/react';
import React from "react";
import { AppTheme } from "~/app-theme";
import { MemoryRouter } from "react-router";

export function testRender(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter>
        <AppTheme env="test">{children}</AppTheme>
      </MemoryRouter>
    ),
  });
}
