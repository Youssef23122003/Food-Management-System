import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../Shared/Components/header/header.component";
import { Token } from '../../Core/Interfaces/token.interface';
import { AuthService } from '../../Core/Services/Auth Service/auth.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexPlotOptions
} from 'ng-apexcharts';
import { RecipesService } from '../../Core/Services/Recipes Service/recipes.service';
import { CategoriesService } from '../../Core/Services/Categories Service/categories.service';
import { User } from '../users-list/Interfaces/user.interface';
import { UsersService } from '../users-list/Services/users.service';
import { Recipe } from '../../Core/Interfaces/recipe.interface';
import { Categories } from '../../Core/Interfaces/categories.interface';
import { TagsService } from '../../Core/Services/Tags Service/tags.service';
import { Tag } from '../../Core/Interfaces/tag.interface';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  token!: Token;

  usersList: User[] = [];
  recipesList: Recipe[] = [];
  categoriesList: Categories[] = [];
  tagsList: Tag[] = [];

  users: User[] = [];
  admins: User[] = [];

  // ================================
  // Pie (Admins + Users)
  // ================================
  colors = ['#bb9de7', '#e7b50e'];
  series: ApexNonAxisChartSeries = [];
  chart: ApexChart = {
    type: 'pie',
    height: 250,
    animations: {
      enabled: true,

      speed: 1200,
      animateGradually: {
        enabled: true,
        delay: 300
      },
      dynamicAnimation: {
        enabled: true,
        speed: 400
      }
    }
  };
  labels = ['Admins', 'Users'];
  plotOptions: ApexPlotOptions = {
    pie: { donut: { size: '65%' } }
  };
  legend: ApexLegend = { position: 'bottom' };

  // ================================
  // Donut (Recipes + Categories + Tags)
  // ================================
  seriesRecipes: ApexNonAxisChartSeries = [];
  chartRecipe: ApexChart = {
    type: 'donut',
    height: 300,
    animations: {
      enabled: true,

      speed: 1200,
      animateGradually: {
        enabled: true,
        delay: 300
      },
      dynamicAnimation: {
        enabled: true,
        speed: 400
      }
    }
  };
  labelsRecipe = ['Recipes', 'Categories', 'Tags'];
  plotOptionsRecipe: ApexPlotOptions = {
    pie: { donut: { size: '65%' } }
  };
  legendRecipe: ApexLegend = { position: 'bottom' };

  // ================================

  private readonly authService = inject(AuthService);
  private readonly recipesService = inject(RecipesService);
  private readonly usersService = inject(UsersService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly tagsService = inject(TagsService);

  ngOnInit(): void {
    this.token = this.authService.decodeToken();


    if (this.token.userGroup !== 'SystemUser') {
      this.getAllusers(1040);
      this.loadDashboardCounts();
    }

  }

  // Load all chart data
  loadDashboardCounts(): void {
    this.getAllRecipesData();
    this.getAllCategoriesData();
    this.getAllTagsData();
  }

  // Update donut chart
  updateRecipeDonutChart(): void {
    this.seriesRecipes = [
      this.recipesList.length,
      this.categoriesList.length,
      this.tagsList.length
    ];
  }

  getAllRecipesData(pageSize = 9999, pageNumber = 1): void {
    this.recipesService.getAllRecipes(pageSize, pageNumber).subscribe({
      next: (res) => {
        this.recipesList = res.data;
        this.updateRecipeDonutChart();
      }
    });
  }

  getAllCategoriesData(pageSize = 9999, pageNumber = 1): void {
    this.categoriesService.getAllCategories(pageSize, pageNumber).subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        this.updateRecipeDonutChart();
      }
    });
  }

  getAllTagsData(): void {
    this.tagsService.getAllTags().subscribe({
      next: (res) => {
        this.tagsList = res;
        this.updateRecipeDonutChart();
      }
    });
  }

  getAllusers(pageSize = 1000, pageNumber = 1): void {
    this.usersService.getAllLoggedUsers(pageSize, pageNumber).subscribe({
      next: (res) => {
        this.usersList = res.data;

        this.users = this.usersList.filter(u => u.group.name === 'SystemUser');
        this.admins = this.usersList.filter(u => u.group.name === 'SuperAdmin');

        this.series = [this.admins.length, this.users.length];
      }
    });
  }
}
