import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p class="text-gray-600">Bienvenue dans la zone d’administration 🚀</p>

      <div class="grid grid-cols-3 gap-4 mt-6">
        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold">Gestion des utilisateurs</h2>
          <p class="text-sm text-gray-500">Créer, modifier et supprimer des utilisateurs.</p>
        </div>
        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold">Statistiques</h2>
          <p class="text-sm text-gray-500">Aperçu de l’activité des utilisateurs.</p>
        </div>
        <div class="bg-white shadow rounded p-4">
          <h2 class="font-semibold">Paramètres</h2>
          <p class="text-sm text-gray-500">Configurer l’application.</p>
        </div>
      </div>
    </div>
  `,
})
export class AdminDashboardComponent {}
