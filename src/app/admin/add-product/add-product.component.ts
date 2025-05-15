import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { CategoryService } from '../../core/services/category.service'; // Шлях онови за потреби
import {Color, ProductType, Print, MonthlyEvent} from '../../core/models/category-models';
import {NgForOf, NgIf} from '@angular/common';
import {ProductService} from '../../core/services/product.service';

export type { Color, ProductType, Print };
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  imagesPreview: string[] = [];
  selectedFiles: File[] = [];
  imageError: string = '';
  genders: string[] = ['Men', 'Women', 'Unisex'];
  monthlyEvents: MonthlyEvent[] = [];
  filteredGenders: string[] = [];
  productTypes: ProductType[] = [];
  colors: Color[] = [];
  prints: Print[] = [];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private productService: ProductService) {
    this.productForm = this.fb.group({
      type: ['', Validators.required],
      color: ['', Validators.required],
      print: ['', Validators.required],
      gender: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      monthlyEvent: [null]
    });

  }

  ngOnInit(): void {
    this.categoryService.getProductTypes().subscribe(types => this.productTypes = types);
    this.categoryService.getColors().subscribe(colors => this.colors = colors);
    this.categoryService.getPrints().subscribe(prints => this.prints = prints);
    this.categoryService.getMonthlyEvents().subscribe(events => this.monthlyEvents = events);

    this.productForm.get('type')?.valueChanges.subscribe((selectedType: ProductType) => {
      if (selectedType?.gender) {
        this.filteredGenders = [selectedType.gender];
        this.productForm.get('gender')?.setValue(selectedType.gender);
      } else {
        this.filteredGenders = this.genders;
      }
    });
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;

    if (this.selectedFiles.length + files.length > 5) {
      this.imageError = 'Можна завантажити не більше 5 фото';
      event.target.value = '';
      return;
    }

    this.imageError = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => this.imagesPreview.push(e.target.result);
      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }

  onSubmit(fileInput: HTMLInputElement) {
    if (this.productForm.valid && this.selectedFiles.length > 0) {
      const {type, color, print,gender, price,monthlyEvent} = this.productForm.value;

      const formData = new FormData();
      formData.append('typeId', type.id);
      formData.append('colorId', color.id);
      formData.append('printId', print.id);
      formData.append('gender', gender);
      formData.append('price', price.toString());
      if (monthlyEvent) {
        formData.append('monthlyEventId', monthlyEvent.id);
      }
      this.selectedFiles.forEach(file => formData.append('images', file));

      this.productService.addProduct(formData).subscribe({
        next: (res) => {
          console.log('Успішно додано товар:', res);
          this.productForm.reset();
          this.imagesPreview = [];
          this.selectedFiles = [];

          fileInput.value = '';
        },
        error: (err) => {
          console.error('Помилка при додаванні товару:', err);
        }
      });
    }
  }
}
