import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';


@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,
    public taostr:ToastrService ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId==0)
    this.insertForm(form);
    else
    this.updateForm(form)
  
  }

  insertForm(form:NgForm){
    this.service.postPaymentDetail().subscribe({
      next:(res)=>{
        this.resetForm(form);
        this.service.refreshList();
        this.taostr.success('Submitted Sucessfully','Payment Details Register');

      },
      error:(err)=>{console.log(err);}
    });

  }

  updateForm(form:NgForm){
    this.service.putPaymentDetail().subscribe({
      next:(res)=>{
        this.resetForm(form);
        this.service.refreshList();
        this.taostr.info('Updated Sucessfully','Payment Details Register');

      },
      error:(err)=>{console.log(err);}
    });


  }



  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData=new PaymentDetail();
  }

}
