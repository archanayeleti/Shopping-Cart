import React, { Component } from 'react';
	 
	var CoursesArr=[];

class Coursesales extends Component {
	
  sumPrice(price){
    this.setState({total: this.state.total + price});
  }

  constructor(props){
    super(props);
    this.state = {
      	total: 0,
		showAddCourse: false,
		newCourses:false,
		course:[],
		price:'',
		AllCourses: this.props.items
		
    };
	  
	  CoursesArr = this.state.AllCourses;
	  this.sumPrice = this.sumPrice.bind(this);
	  this.onClick = this.onClick.bind(this);
	  this.addTextBox = this.addTextBox.bind(this);
	  this.UpdateAllCourses = this.UpdateAllCourses.bind(this);
	  this.DeleteCourse = this.DeleteCourse.bind(this);
  }
	
	addTextBox(){
		this.setState({newCourses:true})
		CoursesArr.push({ name:this.state.courseVal, price:parseInt(this.state.priceVal)});
		this.setState({AllCourses : CoursesArr});
		document.getElementById('CourseInput').value="";
		this.setState({ showAddCourse: false });
	}
	onClick() {
		 this.setState({ showAddCourse: true });
    }
	
	UpdateAllCourses(allcor, index){
		CoursesArr[index]=allcor;
		console.log("CoursesArr[index] ");
		console.log(CoursesArr[index]);
		this.setState({AllCourses:CoursesArr});
	}
	
	DeleteCourse(index, neg){
		console.log(neg);
		if(neg)
			this.setState({total:this.state.total-CoursesArr[index].price});
		CoursesArr.splice(index,1);
		console.log(CoursesArr);
		
		this.setState({AllCourses:CoursesArr});
		
	}

  render(){
	var courses = this.state.AllCourses.map((item, i) => {
	
	return <Course id={ i } name={item.name} price={item.price}
        key={i} sumPrice={this.sumPrice} active={item.active} updateCourses={this.UpdateAllCourses} DeleteCourse={this.DeleteCourse}/>
    });
	  
	 
	  		
    return(
      <div>
        <h1>You can buy courses: </h1>
        <div id="courses">
          {courses}
		<p id="total"> Total <b>{this.state.total}</b></p>
		  
		<input type="submit" className="btn btn-primary" value="Add Course" onClick={this.onClick} />
            
			{ this.state.showAddCourse ? <div id="results" className="search-results"><br/>
							<div >
						<input className="form-control" placeholder="Enter new course" id="CourseInput" onChange={event =>this.setState({courseVal: event.target.value})}  /><br/>
						<input className="form-control" placeholder="Enter prize" id="PriceInput" onChange={event =>this.setState({priceVal:event.target.value})}  /><br/>
						<button className="btn btn-warning" onClick={this.addTextBox} >Save</button><br/>
						</div>
						</div> : null }
	  
        </div>
	 </div>
    );
  }
}



class Course extends Component {
	
	constructor(props){
		super(props);

		this.state = {
		  active: false,
		  showedit:false
		};
		this.selected = this.selected.bind(this);
		this.clicked = this.clicked.bind(this);
		this.SaveChanges = this.SaveChanges.bind(this);
		this.DeleteCor = this.DeleteCor.bind(this);
	}
	

  selected(){
    var active = !this.state.active;
    this.setState({active: active});
    this.props.sumPrice(active ? this.props.price : -this.props.price);
  }

	clicked(){
		this.setState({showedit:true});
		this.setState({name:this.props.name});
		this.setState({price: this.props.price})
	}
	
  SaveChanges(){
	  var editedCor={ name:this.state.name, price:parseInt(this.state.price)}
	  this.props.updateCourses(editedCor, this.props.id);
	  this.setState({showedit:false});
  }
	
	DeleteCor(){
		this.props.DeleteCourse(this.props.id, this.state.active);
		this.setState({active:''});
	}

  render(){
	
    return(
      <div >
        <p className={this.state.active ? 'active' : ''} onClick={this.selected}> 
			{!this.state.showedit ? <span>{this.props.name} <b>{this.props.price}  </b></span>:null} 
			{this.state.showedit ? <span>
			<input value={this.state.name}  onChange={event => this.setState({name: event.target.value})}/><b>
			<input value={this.state.price} onChange={event => this.setState({price: event.target.value})}/></b>
			</span>: null}
		</p>
		{!this.state.showedit ?<button className="btn" onClick={this.clicked}>Edit</button>:null}&nbsp;&nbsp;
		<button className="btn" onClick={this.DeleteCor}>Delete</button>&nbsp;&nbsp;
		{this.state.showedit ?<button className="btn" onClick={this.SaveChanges}>Save</button>:null}<br/><br/>
      </div>
    );
  }
}


export default Coursesales;
