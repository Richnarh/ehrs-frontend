import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Patient, PatientVital } from 'src/app/patient/payload/patient';
import { PatientService } from 'src/app/patient/services/patient.service';
import { LookupItem } from 'src/app/payload/lookupItem';
import { EventProxyService } from 'src/app/services/event-proxy.service';
import { LookupService } from 'src/app/services/lookup.service';
import { PageView } from 'src/app/utils/page-view';
import { SweetMessage } from 'src/app/utils/sweet-message';
import { ToastService } from 'src/app/utils/toast-service';

@Component({
  selector: 'app-vital-form',
  templateUrl: './vital-form.component.html',
  styleUrls: ['./vital-form.component.scss']
})
export class VitalFormComponent implements OnInit {
  @Input() selectedPatient: Patient;
  @Input() vitalList: PatientVital[];

  pageView: PageView = PageView.listView();
  sourceList:LookupItem[];
  physicianList:LookupItem[];

  patientVitalForm: FormGroup;
  constructor(
    private readonly patientVitalService: PatientService,
    private readonly toast: ToastService,
    private readonly fb: FormBuilder,
    private readonly lookupService: LookupService,
    private readonly eventProxyService: EventProxyService) { }

  ngOnInit (): void {
    this.setupPatientVitalForm();
    this.resetForm();
    this.initLookups();
    this.eventProxyService.getEventSubject().subscribe((param: any) => {
      if (param !== undefined) {
        this.editPatientVital(param);
      }
    });
  }

  async savePatientVital () {
    if (this.patientVitalForm.invalid) {
      this.toast.error('Some fields are required!');
      return;
    }
    let vital = this.patientVitalForm.value;
    vital.patientId = this.selectedPatient.id;
    const result = await firstValueFrom(this.patientVitalService.savePatientVital(vital, this.selectedPatient.id));
    if (result) {
      this.toast.success(result.message);
      this.pageView.resetToListView();
      this.resetForm();
    } else {
      this.toast.error(result.message);
    }
  }

  async initLookups(){
    const source = await firstValueFrom(this.lookupService.source());
    const physician = await firstValueFrom(this.lookupService.employee());
    this.sourceList = source.data;
    this.physicianList = physician.data;
  }

  async fetchPatientVital(){
    const result = await firstValueFrom(this.patientVitalService.loadPatientVital(this.selectedPatient.id));
    console.log(result.data);
    this.vitalList = result.data;
  }

  editPatientVital (patientVital: PatientVital) {
    this.patientVitalForm.patchValue({});
    this.patientVitalForm.patchValue(patientVital);
  }

  async deletePatientVital (patientVitalId: string) {
    const confirm = await SweetMessage.deleteConfirm();
    if (!confirm.value) return;
    const result = await firstValueFrom(this.patientVitalService.deletePatientVital(patientVitalId, this.selectedPatient.id));
    if (result.success) {
      this.toast.success(result.message);
      this.fetchPatientVital();
    } else {
      this.toast.error(result.message);
    }
  }

  resetForm () {
    this.patientVitalForm.reset();
    this.patientVitalForm.patchValue({});
  }

  setupPatientVitalForm () {
    this.patientVitalForm = this.fb.group({
      id: null,
      patientId: [null],
      bp: [null, Validators.required],
      temp: [null, Validators.required],
      pulse: [null, Validators.required],
      spTwo: [null, Validators.required],
      weight: [null, Validators.required],
      comment: [null],
    });
  }

  get field () {
    return this.patientVitalForm.controls;
  }
}
