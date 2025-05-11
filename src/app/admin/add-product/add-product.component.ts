import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: FormGroup;
  imagesPreview: string[] = [];
  selectedFiles: File[] = [];
  imageError: string = '';

  productTypes: string[] = [
    'Футболка чоловіча',
    'Футболка оверсайз унісекс',
    'Худі жіноче',
    'Худі чоловіче',
    'Штани спортивні',
    'Шорти',
    'Кофта з капюшоном',
    'Світшот унісекс',
    'Майка',
    'Кроп-топ'
  ];

  colors: string[] = [
    'Black', 'White', 'Red', 'Blue', 'Green',
    'Yellow', 'Orange', 'Pink', 'Grey', 'Beige'
  ];

  prints: string[] = [
    'Attack on Titan',
    'Naruto',
    'One Piece',
    'Chainsaw Man',
    'Demon Slayer',
    'Jujutsu Kaisen',
    'Dragon Ball',
    'Bleach',
    'Tokyo Ghoul',
    'Death Note'
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      type: ['', Validators.required],
      color: ['', Validators.required],
      print: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;

    // Якщо загальна кількість перевищує 5
    if (this.selectedFiles.length + files.length > 5) {
      this.imageError = 'Можна завантажити не більше 5 фото';
      event.target.value = '';
      return;
    }

    this.imageError = ''; // очищаємо попередню помилку

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagesPreview.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    event.target.value = '';
  }


  onSubmit(fileInput: HTMLInputElement) {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const finalName = `${formValue.type} ${formValue.print} (${formValue.color})`;

      console.log('Формований заголовок товару:', finalName);
      console.log('Файли:', this.selectedFiles);

      // TODO: Надсилання на сервер

      this.productForm.reset();
      this.imagesPreview = [];
      this.selectedFiles = [];
      fileInput.value = '';
    }
  }
}
