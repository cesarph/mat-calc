var mongoose = require("mongoose");
var Semester = require("./models/semester");
var Course = require("./models/course");
var Metric = require("./models/metric");

var data = [
  {
    name: "Semestre 1"
  },
  {
    name: "Semestre 2"
  },
  {
    name: "Semestre 3"
  }
];
var porc = [30, 40, 30];
function seedDB(){
  //remove all campgrounds
  Semester.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed semesters");
    //add a few campgrounds
    data.forEach(function(seed, i){
      Semester.create(seed, function(err, semester){
        if(err){
          console.log(err);
        }else{
          // console.log("added a Semester");
          //crete comment
          Course.remove({}, function(err){
            Course.create({
                            name: "Sistemas Operativos",
                          }, function(err, course){
                            if(err){
                              console.log(err);
                            }else{
                              Metric.remove({}, function(err){
                                Metric.create({
                                                name: "Examen "+(i+1),
                                                porcentage: porc[i],
                                                grade: parseInt(Math.random()*10+1)
                                              }, function(err, met){
                                                if(err){
                                                  console.log(err);
                                                }else{
                                                  course.metric.push(met);
                                                  course.save();
                                                  // console.log("course: "+ course);
                                                  // console.log("metric: "+met);
                                                  // console.log("semester: " + semester);
                                                  // console.log("Created a new metric");
                                                }

                                              });
                                              semester.courses.push(course);
                                              semester.save();
                                              // console.log(JSON.stringify(semester.courses, null, 4));
                                  // console.log("Created a new course");
                              });
                            }

            });

        });
      }
      });
    });
  });
}


module.exports = seedDB;