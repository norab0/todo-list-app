import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 class="text-2xl font-bold mb-4">Connexion</h2>
      <form>
        <input type="email" placeholder="Email" class="border p-2 rounded w-full mb-3" />
        <input type="password" placeholder="Mot de passe" class="border p-2 rounded w-full mb-3" />
        <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
          Se connecter
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {}
