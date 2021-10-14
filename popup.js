
  let alamat=document.URL;//ambil url yg aktif
  let SPC_CDS=null;
  if(alamat.includes('seller.shopee.co.id/portal/sale')) Ambil_SPC_CDS()//jika alamat yang dibuka sama si client ada hubungannya sama seller.shopee.co.id
  function Ambil_SPC_CDS(cb){
    let kuki = `; ${document.cookie}`.split(' ').join('');//ambil kuki dan buang spasi
    kuki = (kuki).split(";")//pisahkan 
    for (let yt = 0; yt < kuki.length; yt++) {//loop 
        if (kuki[yt].split("=")[0] === "SPC_CDS") {//cari spc cds aja
          SPC_CDS = kuki[yt]//udah dapet
          cekdulu()//panggil  untuk cek apakah udah load sempurna halaman si shopee
          break;// putus
        }
    }
  }
  function injectTombol() {  
    //masukkan tombol untuk ambil data penjualan yang belum di proses
    $(".more-action").append('<button id="btn_export_shopee_duta" type="button" class="ship-btn shopee-button shopee-button--large" style="background-color: #2d95ee;margin-left: 10px;color:#fff"><i class="shopee-icon" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.035 4h7.923l-.238-1.105a.5.5 0 0 0-.49-.395H4.763a.5.5 0 0 0-.489.395L4.035 4zm9.471.065A2 2 0 0 1 15 6v7a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 1.486-1.933l.32-1.488A2 2 0 0 1 4.763 1h6.469a2 2 0 0 1 1.955 1.579l.32 1.486zM13.5 6h-11v7a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V6zM4.75 8h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5zm0 3h2.5a.75.75 0 1 1 0 1.5h-2.5a.75.75 0 1 1 0-1.5z"></path></svg></i><span>Export Massal Ke Duta</span></button>')
    return true;  
  }
  function cekdulu(){
    setTimeout(() => {
      //cek kelas more-action udah ada belum?
      if ($(".more-action")[0]){
        //ada, panggil fungsi append tombol
        injectTombol()
    } else {
      cekdulu()//belum ada? cek lagi tiap 1 detik
    }
    }, 1000);
  }
  $('body').on('click','#btn_export_shopee_duta',function(){
    //tombol duta di klik, isinya ada di url di bawah, tinggal kirim pakai API, simpan database, dll terserah.
    $('body').load(`https://seller.shopee.co.id/api/v3/order/get_package_list?SPC_CDS=${SPC_CDS}&SPC_CDS_VER=2&source=to_process&page_size=40&page_number=1&total=0&sort_by=confirmed_date_asc`)
});