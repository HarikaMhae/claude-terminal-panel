// node-pty types
export interface IPty {
  onData: (callback: (data: string) => void) => void;
  onExit: (callback: (exitCode: { exitCode: number; signal?: number }) => void) => void;
  write: (data: string) => void;
  resize: (cols: number, rows: number) => void;
  kill: () => void;
}

export interface INodePty {
  spawn: (
    file: string,
    args: string[],
    options: {
      name?: string;
      cols?: number;
      rows?: number;
      cwd?: string;
      env?: Record<string, string | undefined>;
    }
  ) => IPty;
}

// Configuration
export interface TerminalConfig {
  command: string;
  args: string[];
  autoRun: boolean;
  shell: string;
  env: Record<string, string>;
  directMode: boolean;
}

// Terminal instance for multi-tab support
export interface TerminalInstance {
  id: string;
  name: string;
  pty: IPty | undefined;
  isActive: boolean;
}

// Tab information for UI
export interface TabInfo {
  id: string;
  name: string;
  isActive: boolean;
}

// Webview message types (from webview to extension)
export type WebviewMessage =
  | { type: 'ready'; cols?: number; rows?: number }
  | { type: 'input'; id: string; data: string }
  | { type: 'resize'; id: string; cols: number; rows: number }
  | { type: 'newTab' }
  | { type: 'closeTab'; id: string }
  | { type: 'switchTab'; id: string };

// Extension message types (from extension to webview)
export type ExtensionMessage =
  | { type: 'output'; id: string; data: string }
  | { type: 'clear'; id: string }
  | { type: 'tabsUpdate'; tabs: TabInfo[] }
  | { type: 'createTab'; id: string; name: string }
  | { type: 'switchTab'; id: string }
  | { type: 'removeTab'; id: string };
