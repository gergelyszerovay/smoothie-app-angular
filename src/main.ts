import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@features/shell/app.component';
import { appConfig } from '@features/shell/app.config';

void bootstrapApplication(AppComponent, appConfig).catch((err: unknown) => {
  console.error(err);
});
