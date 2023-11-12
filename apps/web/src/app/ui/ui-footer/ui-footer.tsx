import { ReactNode } from 'react';
import classes from './ui-footer.module.css';

export function UiFooter({ children }: { children: ReactNode }) {
  return <footer className={classes.footer}>{children}</footer>;
}
