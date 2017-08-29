import { Component, OnInit } from '@angular/core';
import { AppService } from "./app.service";
import { Calendarevent } from "./calendarevent";
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  check="You are a genius";
  allEvents: JSON;
  new_event: Calendarevent= new Calendarevent()


  constructor(
    private _appService:AppService
  ){
  }
  
  ngOnInit() {
    this.readJsonFile(this.calendarJs);  
  }

  //*****************ALL FUNCTIONS****************** */

  //Create new event (call create event function from services)
  createEvent(){
    console.log("NEW EVENT TITLE: " + this.new_event.type)
    this._appService.createEvent(this.new_event)
        // .then(()=>{
            this.new_event=new Calendarevent();
        // })
        // .catch((err)=>{console.log("Error adding event: "+ err)})
  }

  readJsonFile(callback){
    this._appService.readJsonFile()
    .then((data)=>{
      this.allEvents=data;
      callback(this.allEvents);
    })
    .catch((err)=>{console.log("Error getting events"+err)})
  }


  calendarJs(allEvents){
    var $calendar = $("#calendar");
    //Get current DateTime
    var currentYear = (new Date).getFullYear();
    var currentMonth = (new Date).getMonth() + 1;
    if (currentMonth < 10) { currentMonth = 0 + currentMonth; }


    $calendar.fullCalendar({
        header: {
            left: ' today,prev,next,  title',
            right: 'month,agendaWeek,agendaDay '
        },
        footer: {
            left: 'prevYear',
            right: 'nextYear'
        },
        weekends: true,
        allDaySlot: true,
        droppable: false,
        editable: true,
        // events: [{
        //     title: 'IT Meeting',
        //     start: new Date(2017, 7, 14, 14, 30),
        //     editable: true,
        //     backgroundColor: "#B3B3B3",
        // },{
        //     title: 'Lunch Catered by Jimmy Johns',
        //     start: currentYear + '-' + currentMonth + '-26',
        //     editable: true
        // },{
        //     title: 'First Email Blast',
        //     start: currentYear + '-' + currentMonth + '-18',
        //     editable: true
        // },{
        //     title: 'Davidson Conference',
        //     start: currentYear + '-' + currentMonth + '-07',
        //     end: currentYear + '-' + currentMonth + '-10',
        //     editable: true
        // },{
        //     title: 'Aliona Visiting',
        //     start: currentYear + '-' + currentMonth + '-29',
        //     end: currentYear + '-' + currentMonth + '-31',
        //     editable: true
        // },],


        // eventSources:[
        //     {url:'http://localhost:4200/assets/source/file.json'}
        // ],

        events:allEvents,
        //Change this to edit plus add delete button
        eventClick: function(calEvent, jsEvent, view) {

            if(calEvent.title){
                document.getElementById("eventTitle").innerHTML="<p><strong> Title: </strong>" + calEvent.title +"</p>";
            }
            if(calEvent.start){
                document.getElementById("eventStart").innerHTML="<p><strong> Start date: </strong>" + calEvent.start.format("YYYY, MMMM DD  hh:mm A")  +"</p>";
            }
            if(calEvent.end){
                document.getElementById("eventEnd").innerHTML="<p><strong> End date: </strong>" + calEvent.end.format("YYYY,MMMM DD hh:mm A") +"</p>";
            }  
            if(calEvent.location){
              document.getElementById("location").innerHTML="<p><strong> Location: </strong>" + calEvent.location +"</p>";
            } 
            if(calEvent.description){
              document.getElementById("description").innerHTML="<p><strong> Description: </strong>" + calEvent.description +"</p>";
            }  
          

            $("#myModal").fadeIn(1000);     
        },

        dayClick: function(date, jsEvent, view) {  
            $("#eventForm").fadeIn(500)           
        },
        eventRender: function(event, element) {
            element.bind('dblclick', function() {
               alert('double click!');
            });
        },
        //On event mouse over display an infobox
        eventMouseover: function(calEvent, jsEvent, view){

            console.log("Display event info");
        }
        



    });


//MODAL POPOVER

    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.addEventListener ("click",function() {
      modal.style.display = "none";
  }) 
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }}

        
//FORM POPOVER

    var form = document.getElementById('eventForm');
    var span = document.getElementsByClassName("closeForm")[0];
    var submit= document.getElementById("submitEvent");

    //Close the modal after submiting the form
    submit.addEventListener("click", function(){
      form.style.display="none";
    })
    // When the user clicks on <span> (x), close the modal
    span.addEventListener("click",function() {
      form.style.display = "none";
  })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == form) {
            form.style.display = "none";
        }


    }

        
    
  }


  }


