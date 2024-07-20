

<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width">
  <title></title>
  <style></style>
 </head>

 <body style="margin: 0; padding: 0;">
   <div id="email" style="width:500px; margin: auto; background-color: rgba(255, 249, 243, 1);">  
    <table role="presentation" border="0" cellspacing="0" width="100%" style="font-family: 'Helvetica', MS Sans Serif, Arial;" >
      <tr>
        <td style="background-image: url(https://quaintstays.laraveldevelopmentcompany.com/public/img/hero-1.jpg); text-align: center; background-size: 100% 100%; background-position: bottom;">
          <img style="margin-bottom: 2.5rem; margin-top: 1.875rem; " src="https://quaintstays.laraveldevelopmentcompany.com/public/img/QsJaipur-logo.png" alt="logo">
          <h1 style="font-size: 1.5rem; color: #fff; font-weight: 700; text-align: center; margin: 0 auto; margin-bottom: 2.5rem; max-width: 360px; font-family: 'Helvetica', 'MS Sans Serif', Arial; text-transform: uppercase;">Your Booking Confirmation for @php echo ucwords($property['name'] ?? 'N/A'); @endphp </h1>
        </td>
      </tr>
      <tr>
        <td style="background-image: url(https://quaintstays.laraveldevelopmentcompany.com/public/img/hero-2.jpg); background-size: 100% 100%; background-position: top; padding: 0 1.25rem;">
          <div style="background-color: rgba(255, 255, 255, 1); padding: 1.563rem 1.875rem; ">
            <p style="margin-bottom: 1.563rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;">Dear @php echo ucwords($user['name'])?? 'User'  @endphp ,</p>
            <p style="margin: 0px; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem; line-height: 1.5rem;">We're excited to confirm your booking at <strong>@php echo ucwords($property['name'] ?? 'N/A'); @endphp </strong>! Your stay is scheduled from <strong>{{ \Carbon\Carbon::parse($booking['check_in'] ?? null)->format('F j, Y') }}</strong> to <strong>{{ \Carbon\Carbon::parse($booking['check_out'] ?? null)->format('F j, Y') }} </strong>. Here are the details:</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 1.25rem;">
          <div style="background-color: rgba(255, 255, 255, 1); padding: 0px 1.875rem; ">
            <div style="background-color: #fff5ec; padding: 1.563rem 1.25rem;">
              <ul style="margin: 0px; padding: 0; list-style: none;">
                <li style="margin-bottom: 0.625rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Booking ID:</strong> {{ $booking['booking_number'] ?? 'N/A' }}</li>
                <li style="margin-bottom: 0.625rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Property Name:</strong> @php echo ucwords($property['name'] ?? 'N/A'); @endphp </li>
                <li style="margin-bottom: 0.625rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Check-in:</strong> {{ \Carbon\Carbon::parse($booking['check_in'] ?? null)->format('F j, Y') }}</li>
                <li style="margin-bottom: 0.625rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Check-out:</strong> {{ \Carbon\Carbon::parse($booking['check_out'] ?? null)->format('F j, Y') }} </li>
                <li style="margin-bottom: 0.625rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Number of Guests:</strong> {{ $booking['adults'] + $booking['children'] ??0}}</li>
                <li style="margin-bottom: 0.625rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Number of Pets:</strong> {{ $booking['no_of_pet'] ?? 0 }}</li>

                <li style="color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;"><strong>Total Cost:</strong> ₹{{ $booking['price'] ?? 0 }}</li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 1.25rem;">
          <div style="background-color: rgba(255, 255, 255, 1); padding: 1.563rem 1.875rem; ">
            <p style="margin-bottom: 1.563rem; margin-top: 0rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;">Please review the attached booking summary for any discrepancies</p>
            <p style="margin-bottom: 1.563rem; margin-top: 0rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;">For any inquiries or changes to your reservation, feel free to reply directly to this email or contact us at <strong>{{$adminUser['phone_no'] ?? 'N/A'}}</strong>.</p>
            <p style="margin-bottom: 1.563rem; margin-top: 0rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;">We look forward to welcoming you and ensuring you have a fantastic stay!</p>
            <p style="margin-bottom: 0.313rem; margin-top: 0rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;">Best regards,</p>
            <p style="margin-bottom: 0rem; margin-top: 0rem; color: rgba(38, 38, 38, 1); font-size: 1rem; line-height: 1.5rem;">Quientstays</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 1.25rem;">
          <div style="text-align: center; ">
            <img style=" margin-top: 2.5rem; " src="https://quaintstays.laraveldevelopmentcompany.com/public/img/QsJaipur-logo.png" alt="logo">
            @if(is_string($property['location']))
              @php
                $decode = json_decode($property['location'], true);
                $locationDecode = ($decode !== null) ? $decode : [];
              @endphp
            @else
              @php
                $locationDecode = [];
              @endphp
            @endif

            @php 

            $testlocation = '['.$locationDecode.']';
            $testLocationDecode = json_decode($testlocation, true);
            $address = isset($testLocationDecode[0]['location']) ? $testLocationDecode[0]['location'] : 'N/A';

            @endphp
            <p style="margin-bottom: 1.188rem;  ">{{$address }}</p>
            <div style="margin-bottom: 1.188rem;  ">
              <a style="margin-right: 0.563rem;" href="#"><img src="https://quaintstays.laraveldevelopmentcompany.com/public/img/gg_facebook.png" alt=""></a>
              <a style="margin-right: 0.563rem;" href="#"><img src="https://quaintstays.laraveldevelopmentcompany.com/public/img/ri_instagram-fill.png" alt=""></a>
              <a href="#"><img src="https://quaintstays.laraveldevelopmentcompany.com/public/img/ri_linkedin-fill.png" alt=""></a>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <table role="presentation" border="0" cellspacing="0" width="100%" style="font-family: 'Helvetica', MS Sans Serif, Arial; text-align: center; padding: 1.125rem 0; border-top: 1px solid #dcac8129;">
      <tr>
        <td>
          <p style="color: rgba(169, 155, 143, 1); font-size: 0.813rem;">© quaintspacesjaipur {{ now()->year }}</p>
        </td>
      </tr>
    </table>
  </div>
</body>
