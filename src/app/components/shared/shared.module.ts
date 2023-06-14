import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    NavbarComponent,
    QuienSoyComponent,
    SpinnerComponent,
    ChatComponent,
  ],
  exports: [
    NavbarComponent,
    QuienSoyComponent,
    SpinnerComponent,
    ChatComponent,
  ],
  imports: [CommonModule, RouterModule,FormsModule],
})
export class SharedModule {}
