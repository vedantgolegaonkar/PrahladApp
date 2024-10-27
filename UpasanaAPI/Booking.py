from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from flask_sqlalchemy import SQLAlchemy
import logging

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin123@localhost/Upasana'
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    middle_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    mobile_number = db.Column(db.String(15), unique=True, nullable=False)
    alternate_mobile_number = db.Column(db.String(15))
    flat_no = db.Column(db.String(20))
    full_address = db.Column(db.Text, nullable=False)
    area = db.Column(db.String(100))
    landmark = db.Column(db.String(100))
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    anugrahit = db.Column(db.String(3), default='no')
    gender = db.Column(db.String(10), default='male')
    unique_family_code = db.Column(db.Integer, unique=True)

    # Relationship with Booking
    bookings = db.relationship('Booking', backref='user', lazy=True)
    
# Define the booking model
class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    booking_date = db.Column(db.Date, nullable=False)
    zone = db.Column(db.String(1), nullable=False)
    mahaprasad = db.Column(db.Boolean, default=False)


# Function to get all Saturdays from December 1st of the year
def get_saturdays_for_year():
    start_date = datetime(datetime.now().year, 12, 1)
    saturdays = []
    for i in range(365):
        date = start_date + timedelta(days=i)
        if date.weekday() == 5:  # Saturday is 5th day of the week
            saturdays.append(date.date())
    return saturdays

# Function to check if the booking is allowed
def is_booking_allowed(user_id, zone, booking_date):
    # Check if the user has already booked for this year
    current_year = datetime.now().year
    start_of_year = datetime(current_year, 1, 1)
    end_of_year = datetime(current_year, 12, 31)

    existing_bookings = Booking.query.filter_by(user_id=user_id).filter(
        Booking.booking_date.between(start_of_year, end_of_year)
    ).all()

    if zone == 'A':
        if len(existing_bookings) >= 1:
            return False, "Zone A members can only book once a year."
    elif zone in ['B', 'C']:
        if len(existing_bookings) >= 2:
            return False, "Zone B and C members can book a maximum of twice per year."
    
    # Check if the booking date is a Saturday
    if booking_date not in get_saturdays_for_year():
        return False, "You can only book on a Saturday."

    # Check for duplicate booking on the same day
    duplicate_booking = Booking.query.filter_by(user_id=user_id, booking_date=booking_date).first()
    if duplicate_booking:
        return False, "You have already booked on this date."
    
    return True, "Booking is allowed."

@app.route('/book', methods=['POST'])
def book():
    data = request.get_json()
    user_id = data.get('user_id')
    zone = data.get('zone')
    mahaprasad = data.get('mahaprasad', False)
    booking_date_str = data.get('booking_date')

    try:
        booking_date = datetime.strptime(booking_date_str, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({"error": "Invalid date format. Use YYYY-MM-DD."}), 400

    # Check if booking is allowed
    is_allowed, message = is_booking_allowed(user_id, zone, booking_date)
    
    if not is_allowed:
        return jsonify({"error": message}), 400

    # If allowed, create a new booking
    new_booking = Booking(
        user_id=user_id,
        booking_date=booking_date,
        zone=zone,
        mahaprasad=mahaprasad
    )
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({"message": "Booking successful"}), 201

@app.route('/api/bookings', methods=['GET'])
def get_all_bookings():
    try:
        # Query all bookings
        bookings = Booking.query.all()
        
        # Convert each booking to a dictionary
        booking_list = [
            {
                'booking_id': booking.booking_id,
                'upasana_id': booking.upasana_id,
                'member_id': booking.member_id,
                'zone': booking.zone,
                'booking_date': booking.booking_date.strftime('%Y-%m-%d'),
                'created_date': booking.created_date.strftime('%Y-%m-%d %H:%M:%S'),
                'mahaprasad': booking.mahaprasad,
                'is_active': booking.is_active,
            }
            for booking in bookings
        ]

        return jsonify(booking_list), 200

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)
