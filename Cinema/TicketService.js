import TicketTypeRequest from "Documents/Library/TicketTypeRequest.js";
import InvalidPurchase from "Documents/Library/InvalidPurchase.js";
import TicketPaymentService from "Documents/thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "Documents/thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
    #IsAccountIdValid(AccountId) {
        if(!Number.isInteger(AccountId) || AccountId <= 0) {
throw new InvalidPurchase (
    `${AccountId} is not a valid Account Id, it should be an integer that is greater than 0`
  );
}
}
     #AdultIncluded(...TicketTypeRequest) {
        let AdultFound = false;
        let AType = "Adult";
        for(const TicketTypeRequest of TicketTypeRequest){
            if (TicketTypeRequest.getTicketType() == AType && TicketTypeRequest.getNumberofTickets() > 0) {
                AdultFound = true;
                break;
            }
        }
     if (!AdultFound) {
        throw new InvalidPurchase ( `Only an adult can purchase the tickets`
        );
      }
    }
    
     #MaximumTicketsAllowed(...TicketTypeRequest) {
     let TotalTickets = 0;
let MaximumTicketCount = 20;
    for(const i of TicketTypeRequest) {
        TotalTickets += i.getNumberofTickets();
        if(TotalTickets>MaximumTicketCount) {
            throw new InvalidPurchase(`Maximum ticket limit is 20 per request`
            );
          }
        }
      }
        
    #CalculateTotalAmountToPay(AccountId, ...TicketTypeRequest) {
let TotalAmount = 0;
let TicketPrice = {
    Infant: 0,
    Child: 10,
    Adult: 20,
};
    

for(const TicketTypeRequest of TicketTypeRequest) {
    TotalAmount += TicketTypeRequest.getNumberofTickets() * TicketPrice[TicketTypeRequest.getTicketType()];
}
const TicketPayment = new TicketPayment();
TicketPayment.MakePayment(AccountId, TotalAmount);
console.log('Total amount paid for the tickets ${TotalAmount}');
    }

#ReserveCalculatedSeats(AccountId, ...TicketTypeRequest) {
let TotalSeats = 0;
let AllocateSeat = {
    Infant: 0,
    Child: 1,
    Adult: 1,
};


for (const TicketTypeRequest of TicketTypeRequest) {
TotalSeats += TicketTypeRequest.getNumberofTickets() * AllocateSeat[TicketTypeRequest.getTicketType()];
}


const SeatReservation = new SeatReservation();
SeatReservation.ReserveSeat(AccountId, TotalSeats);
console.log(`Amount of seats reserved ${TotalSeats}`);
}

PurchaseTickets(AccountId,...TicketTypeRequest){
this.#IsAccountIdValid(AccountId);
this.#AdultIncluded(...TicketTypeRequest);
this.#MaximumTicketsAllowed(...TicketTypeRequest);
this.#CalculateTotalAmountToPay(AccountId,...TicketTypeRequest);
this.#ReserveCalculatedSeats(AccountId,...TicketTypeRequest);
console.log("Ticket developed successfully")
}
}
const b = new TicketService();
const ttr1 = new TicketTypeRequest("Adult", 5);
const ttr2 = new TicketTypeRequest("Infant", 7);
const ttr3 = new TicketTypeRequest("Child", 2);
b.PurchaseTickets(2, ttr1,ttr2,ttr3 )