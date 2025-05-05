import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {
  ConfirmDeleteModalComponent
} from '../../../shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-addresses',
  standalone: true,
  templateUrl: './addresses.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ConfirmDeleteModalComponent
  ],
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  addressForm!: FormGroup;
  isAddingAddress: boolean = false;
  editIndex: number | null = null;
  showConfirmDialog = false;
  deleteIndex: number | null = null;

  selectedRegion: string | null = null;
  isDropdownOpen: boolean = false;

  ukraineRegions: string[] = [
    'Київська область', 'Одеська область', 'Львівська область', 'Харківська область',
  ];

  addresses: any[] = [
    {
      firstName: 'Іван',
      lastName: 'Петренко',
      middleName: 'Олексійович',
      companyName: '',
      country: 'Україна',
      streetName: 'Хрещатик',
      streetDetails: 'буд. 10',
      city: 'Київ',
      region: 'Київська область',
      postalCode: '01001'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      companyName: [''],
      country: ['Україна', Validators.required],
      streetName: ['', Validators.required],
      streetDetails: [''],
      city: ['', Validators.required],
      region: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectRegion(region: string, event: MouseEvent) {
    event.stopPropagation();
    this.selectedRegion = region;
    this.isDropdownOpen = false;
    this.addressForm.get('region')?.setValue(region);
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    const dropdown = event.target as HTMLElement;
    const isClickInside = dropdown.closest('.custom-dropdown');
    if (!isClickInside) {
      this.isDropdownOpen = false;
    }
  }

  startAddingAddress() {
    if (this.isAddingAddress && this.editIndex === null) {
      this.isAddingAddress = false;
      this.addressForm.reset({ country: 'Україна' });
      this.selectedRegion = null;
      return;
    }

    this.isAddingAddress = true;
    this.editIndex = null;
    this.addressForm.reset({ country: 'Україна' });
    this.selectedRegion = null;
  }

  editAddress(index: number): void {
    if (this.isAddingAddress && this.editIndex === index) {
      this.isAddingAddress = false;
      this.editIndex = null;
      this.addressForm.reset({ country: 'Україна' });
      this.selectedRegion = null;
      return;
    }

    const addr = this.addresses[index];
    this.editIndex = index;
    this.isAddingAddress = true;
    this.addressForm.patchValue(addr);
    this.selectedRegion = addr.region;
  }


  deleteAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const address = this.addressForm.value;
      if (this.editIndex !== null) {
        this.addresses[this.editIndex] = address;
      } else {
        this.addresses.push(address);
      }

      this.addressForm.reset({ country: 'Україна' });
      this.selectedRegion = null;
      this.isAddingAddress = false;
      this.editIndex = null;
    }
  }
  confirmDelete(index: number) {
    this.deleteIndex = index;
    this.showConfirmDialog = true;
  }

  onDeleteConfirmed() {
    if (this.deleteIndex !== null) {
      this.addresses.splice(this.deleteIndex, 1);
      this.deleteIndex = null;
      this.showConfirmDialog = false;
    }
  }

  onDeleteCancelled() {
    this.showConfirmDialog = false;
    this.deleteIndex = null;
  }

}
