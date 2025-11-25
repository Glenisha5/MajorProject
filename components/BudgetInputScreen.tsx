"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Building2, Calculator, TrendingUp, AlertTriangle, CheckCircle, MapPin } from "lucide-react"

interface CityData {
  name: string
  multiplier: number
  avgCost: number
}

interface StateData {
  districts: string[]
  cities: CityData[]
}

interface IndianStatesDistricts {
  [key: string]: StateData
}

interface BudgetInputScreenProps {
  onBack?: (data?: { budget: string; area: string; rooms: string }) => void
  onDetailedData?: (data: {
    budget: string
    sqft: string
    bedrooms: string
    bathrooms: string
    state: string
    city: string
    constructionType: string
    qualityLevel: string
    floors: string
    plotSize: string
    hasKitchen: boolean
    hasBalcony: boolean
    hasGarden: boolean
  }) => void
}

export default function BudgetInputScreen({ onBack, onDetailedData }: BudgetInputScreenProps) {
  const [budget, setBudget] = useState("")
  const [sqft, setSqft] = useState("")
  const [bedrooms, setBedrooms] = useState("")
  const [bathrooms, setBathrooms] = useState("")
  const [hasKitchen, setHasKitchen] = useState(true)
  const [hasBalcony, setHasBalcony] = useState(false)
  const [hasGarden, setHasGarden] = useState(false)
  const [state, setState] = useState("")
  const [district, setDistrict] = useState("")
  const [city, setCity] = useState("")
  const [constructionType, setConstructionType] = useState("")
  const [qualityLevel, setQualityLevel] = useState("")
  const [floors, setFloors] = useState("")
  const [plotSize, setPlotSize] = useState("")

  const plotSizeSqft = parseFloat(plotSize) || 0
  const plotSizeCents = plotSizeSqft ? +(plotSizeSqft / 435.6).toFixed(2) : 0

  const [showAnalysis, setShowAnalysis] = useState(false)

  const indianStatesDistricts: IndianStatesDistricts = {
    "Andhra Pradesh": {
      districts: [
        "Anantapur",
        "Chittoor",
        "East Godavari",
        "Guntur",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa",
      ],
      cities: [
        { name: "Visakhapatnam", multiplier: 1.1, avgCost: 2200 },
        { name: "Vijayawada", multiplier: 1.0, avgCost: 2000 },
        { name: "Guntur", multiplier: 0.9, avgCost: 1800 },
        { name: "Nellore", multiplier: 0.8, avgCost: 1600 },
        { name: "Kurnool", multiplier: 0.7, avgCost: 1400 },
      ],
    },
    "Arunachal Pradesh": {
      districts: [
        "Anjaw",
        "Changlang",
        "Dibang Valley",
        "East Kameng",
        "East Siang",
        "Kamle",
        "Kra Daadi",
        "Kurung Kumey",
        "Lepa Rada",
        "Lohit",
        "Longding",
        "Lower Dibang Valley",
        "Lower Siang",
        "Lower Subansiri",
        "Namsai",
        "Pakke Kessang",
        "Papum Pare",
        "Shi Yomi",
        "Siang",
        "Tawang",
        "Tirap",
        "Upper Siang",
        "Upper Subansiri",
        "West Kameng",
        "West Siang",
      ],
      cities: [
        { name: "Itanagar", multiplier: 1.2, avgCost: 2400 },
        { name: "Naharlagun", multiplier: 1.1, avgCost: 2200 },
        { name: "Pasighat", multiplier: 1.0, avgCost: 2000 },
      ],
    },
    Assam: {
      districts: [
        "Baksa",
        "Barpeta",
        "Biswanath",
        "Bongaigaon",
        "Cachar",
        "Charaideo",
        "Chirang",
        "Darrang",
        "Dhemaji",
        "Dhubri",
        "Dibrugarh",
        "Goalpara",
        "Golaghat",
        "Hailakandi",
        "Hojai",
        "Jorhat",
        "Kamrup",
        "Kamrup Metropolitan",
        "Karbi Anglong",
        "Karimganj",
        "Kokrajhar",
        "Lakhimpur",
        "Majuli",
        "Morigaon",
        "Nagaon",
        "Nalbari",
        "Dima Hasao",
        "Sivasagar",
        "Sonitpur",
        "South Salmara-Mankachar",
        "Tinsukia",
        "Udalguri",
        "West Karbi Anglong",
      ],
      cities: [
        { name: "Guwahati", multiplier: 1.1, avgCost: 2200 },
        { name: "Dibrugarh", multiplier: 0.9, avgCost: 1800 },
        { name: "Jorhat", multiplier: 0.8, avgCost: 1600 },
        { name: "Silchar", multiplier: 0.8, avgCost: 1600 },
        { name: "Tezpur", multiplier: 0.7, avgCost: 1400 },
      ],
    },
    Bihar: {
      districts: [
        "Araria",
        "Arwal",
        "Aurangabad",
        "Banka",
        "Begusarai",
        "Bhagalpur",
        "Bhojpur",
        "Buxar",
        "Darbhanga",
        "East Champaran",
        "Gaya",
        "Gopalganj",
        "Jamui",
        "Jehanabad",
        "Kaimur",
        "Katihar",
        "Khagaria",
        "Kishanganj",
        "Lakhisarai",
        "Madhepura",
        "Madhubani",
        "Munger",
        "Muzaffarpur",
        "Nalanda",
        "Nawada",
        "Patna",
        "Purnia",
        "Rohtas",
        "Saharsa",
        "Samastipur",
        "Saran",
        "Sheikhpura",
        "Sheohar",
        "Sitamarhi",
        "Siwan",
        "Supaul",
        "Vaishali",
        "West Champaran",
      ],
      cities: [
        { name: "Patna", multiplier: 0.9, avgCost: 1800 },
        { name: "Gaya", multiplier: 0.7, avgCost: 1400 },
        { name: "Bhagalpur", multiplier: 0.7, avgCost: 1400 },
        { name: "Muzaffarpur", multiplier: 0.6, avgCost: 1200 },
        { name: "Darbhanga", multiplier: 0.6, avgCost: 1200 },
      ],
    },
    Chhattisgarh: {
      districts: [
        "Balod",
        "Baloda Bazar",
        "Balrampur",
        "Bastar",
        "Bemetara",
        "Bijapur",
        "Bilaspur",
        "Dantewada",
        "Dhamtari",
        "Durg",
        "Gariaband",
        "Gaurela Pendra Marwahi",
        "Janjgir Champa",
        "Jashpur",
        "Kabirdham",
        "Kanker",
        "Kondagaon",
        "Korba",
        "Koriya",
        "Mahasamund",
        "Mungeli",
        "Narayanpur",
        "Raigarh",
        "Raipur",
        "Rajnandgaon",
        "Sukma",
        "Surajpur",
        "Surguja",
      ],
      cities: [
        { name: "Raipur", multiplier: 0.9, avgCost: 1800 },
        { name: "Bhilai", multiplier: 0.8, avgCost: 1600 },
        { name: "Bilaspur", multiplier: 0.7, avgCost: 1400 },
        { name: "Korba", multiplier: 0.7, avgCost: 1400 },
        { name: "Durg", multiplier: 0.7, avgCost: 1400 },
      ],
    },
    Goa: {
      districts: ["North Goa", "South Goa"],
      cities: [
        { name: "Panaji", multiplier: 1.3, avgCost: 2600 },
        { name: "Margao", multiplier: 1.2, avgCost: 2400 },
        { name: "Vasco da Gama", multiplier: 1.1, avgCost: 2200 },
      ],
    },
    Gujarat: {
      districts: [
        "Ahmedabad",
        "Amreli",
        "Anand",
        "Aravalli",
        "Banaskantha",
        "Bharuch",
        "Bhavnagar",
        "Botad",
        "Chhota Udaipur",
        "Dahod",
        "Dang",
        "Devbhoomi Dwarka",
        "Gandhinagar",
        "Gir Somnath",
        "Jamnagar",
        "Junagadh",
        "Kheda",
        "Kutch",
        "Mahisagar",
        "Mehsana",
        "Morbi",
        "Narmada",
        "Navsari",
        "Panchmahal",
        "Patan",
        "Porbandar",
        "Rajkot",
        "Sabarkantha",
        "Surat",
        "Surendranagar",
        "Tapi",
        "Vadodara",
        "Valsad",
      ],
      cities: [
        { name: "Ahmedabad", multiplier: 0.9, avgCost: 1800 },
        { name: "Surat", multiplier: 0.9, avgCost: 1800 },
        { name: "Vadodara", multiplier: 0.8, avgCost: 1600 },
        { name: "Rajkot", multiplier: 0.8, avgCost: 1600 },
        { name: "Bhavnagar", multiplier: 0.7, avgCost: 1400 },
      ],
    },
    Haryana: {
      districts: [
        "Ambala",
        "Bhiwani",
        "Charkhi Dadri",
        "Faridabad",
        "Fatehabad",
        "Gurugram",
        "Hisar",
        "Jhajjar",
        "Jind",
        "Kaithal",
        "Karnal",
        "Kurukshetra",
        "Mahendragarh",
        "Nuh",
        "Palwal",
        "Panchkula",
        "Panipat",
        "Rewari",
        "Rohtak",
        "Sirsa",
        "Sonipat",
        "Yamunanagar",
      ],
      cities: [
        { name: "Gurugram", multiplier: 1.3, avgCost: 2600 },
        { name: "Faridabad", multiplier: 1.2, avgCost: 2400 },
        { name: "Panipat", multiplier: 1.0, avgCost: 2000 },
        { name: "Ambala", multiplier: 0.9, avgCost: 1800 },
        { name: "Karnal", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    "Himachal Pradesh": {
      districts: [
        "Bilaspur",
        "Chamba",
        "Hamirpur",
        "Kangra",
        "Kinnaur",
        "Kullu",
        "Lahaul and Spiti",
        "Mandi",
        "Shimla",
        "Sirmaur",
        "Solan",
        "Una",
      ],
      cities: [
        { name: "Shimla", multiplier: 1.2, avgCost: 2400 },
        { name: "Dharamshala", multiplier: 1.1, avgCost: 2200 },
        { name: "Solan", multiplier: 1.0, avgCost: 2000 },
        { name: "Mandi", multiplier: 0.9, avgCost: 1800 },
        { name: "Kullu", multiplier: 1.0, avgCost: 2000 },
      ],
    },
    Jharkhand: {
      districts: [
        "Bokaro",
        "Chatra",
        "Deoghar",
        "Dhanbad",
        "Dumka",
        "East Singhbhum",
        "Garhwa",
        "Giridih",
        "Godda",
        "Gumla",
        "Hazaribagh",
        "Jamtara",
        "Khunti",
        "Koderma",
        "Latehar",
        "Lohardaga",
        "Pakur",
        "Palamu",
        "Ramgarh",
        "Ranchi",
        "Sahibganj",
        "Seraikela Kharsawan",
        "Simdega",
        "West Singhbhum",
      ],
      cities: [
        { name: "Ranchi", multiplier: 0.8, avgCost: 1600 },
        { name: "Jamshedpur", multiplier: 0.8, avgCost: 1600 },
        { name: "Dhanbad", multiplier: 0.7, avgCost: 1400 },
        { name: "Bokaro", multiplier: 0.7, avgCost: 1400 },
        { name: "Deoghar", multiplier: 0.6, avgCost: 1200 },
      ],
    },
    Karnataka: {
      districts: [
        "Bagalkot",
        "Ballari",
        "Belagavi",
        "Bengaluru Rural",
        "Bengaluru Urban",
        "Bidar",
        "Chamarajanagar",
        "Chikballapur",
        "Chikkamagaluru",
        "Chitradurga",
        "Dakshina Kannada",
        "Davanagere",
        "Dharwad",
        "Gadag",
        "Hassan",
        "Haveri",
        "Kalaburagi",
        "Kodagu",
        "Kolar",
        "Koppal",
        "Mandya",
        "Mysuru",
        "Raichur",
        "Ramanagara",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Uttara Kannada",
        "Vijayapura",
        "Yadgir",
      ],
      cities: [
        { name: "Bangalore", multiplier: 1.1, avgCost: 2200 },
        { name: "Mysore", multiplier: 0.9, avgCost: 1800 },
        { name: "Hubli", multiplier: 0.8, avgCost: 1600 },
        { name: "Mangalore", multiplier: 0.9, avgCost: 1800 },
        { name: "Belgaum", multiplier: 0.8, avgCost: 1600 },
        { name: "Manipal", multiplier: 0.9, avgCost: 2000 },
        { name: "Bramhavara", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    Kerala: {
      districts: [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
      ],
      cities: [
        { name: "Kochi", multiplier: 1.1, avgCost: 2200 },
        { name: "Thiruvananthapuram", multiplier: 1.0, avgCost: 2000 },
        { name: "Kozhikode", multiplier: 0.9, avgCost: 1800 },
        { name: "Thrissur", multiplier: 0.9, avgCost: 1800 },
        { name: "Kollam", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    "Madhya Pradesh": {
      districts: [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chachaura",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Niwari",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha",
      ],
      cities: [
        { name: "Indore", multiplier: 0.8, avgCost: 1600 },
        { name: "Bhopal", multiplier: 0.8, avgCost: 1600 },
        { name: "Jabalpur", multiplier: 0.7, avgCost: 1400 },
        { name: "Gwalior", multiplier: 0.7, avgCost: 1400 },
        { name: "Ujjain", multiplier: 0.6, avgCost: 1200 },
      ],
    },
    Maharashtra: {
      districts: [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal",
      ],
      cities: [
        { name: "Mumbai", multiplier: 1.4, avgCost: 2800 },
        { name: "Pune", multiplier: 1.1, avgCost: 2200 },
        { name: "Nagpur", multiplier: 0.9, avgCost: 1800 },
        { name: "Nashik", multiplier: 0.9, avgCost: 1800 },
        { name: "Aurangabad", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    Manipur: {
      districts: [
        "Bishnupur",
        "Chandel",
        "Churachandpur",
        "Imphal East",
        "Imphal West",
        "Jiribam",
        "Kakching",
        "Kamjong",
        "Kangpokpi",
        "Noney",
        "Pherzawl",
        "Senapati",
        "Tamenglong",
        "Tengnoupal",
        "Thoubal",
        "Ukhrul",
      ],
      cities: [
        { name: "Imphal", multiplier: 1.0, avgCost: 2000 },
        { name: "Thoubal", multiplier: 0.9, avgCost: 1800 },
      ],
    },
    Meghalaya: {
      districts: [
        "East Garo Hills",
        "East Jaintia Hills",
        "East Khasi Hills",
        "North Garo Hills",
        "Ri Bhoi",
        "South Garo Hills",
        "South West Garo Hills",
        "South West Khasi Hills",
        "West Garo Hills",
        "West Jaintia Hills",
        "West Khasi Hills",
      ],
      cities: [
        { name: "Shillong", multiplier: 1.1, avgCost: 2200 },
        { name: "Tura", multiplier: 1.0, avgCost: 2000 },
      ],
    },
    Mizoram: {
      districts: [
        "Aizawl",
        "Champhai",
        "Hnahthial",
        "Kolasib",
        "Khawzawl",
        "Lawngtlai",
        "Lunglei",
        "Mamit",
        "Saiha",
        "Saitual",
        "Serchhip",
      ],
      cities: [
        { name: "Aizawl", multiplier: 1.2, avgCost: 2400 },
        { name: "Lunglei", multiplier: 1.1, avgCost: 2200 },
      ],
    },
    Nagaland: {
      districts: [
        "Dimapur",
        "Kiphire",
        "Kohima",
        "Longleng",
        "Mokokchung",
        "Mon",
        "Noklak",
        "Peren",
        "Phek",
        "Tuensang",
        "Wokha",
        "Zunheboto",
      ],
      cities: [
        { name: "Dimapur", multiplier: 1.1, avgCost: 2200 },
        { name: "Kohima", multiplier: 1.0, avgCost: 2000 },
      ],
    },
    Odisha: {
      districts: [
        "Angul",
        "Balangir",
        "Balasore",
        "Bargarh",
        "Bhadrak",
        "Boudh",
        "Cuttack",
        "Deogarh",
        "Dhenkanal",
        "Gajapati",
        "Ganjam",
        "Jagatsinghpur",
        "Jajpur",
        "Jharsuguda",
        "Kalahandi",
        "Kandhamal",
        "Kendrapara",
        "Kendujhar",
        "Khordha",
        "Koraput",
        "Malkangiri",
        "Mayurbhanj",
        "Nabarangpur",
        "Nayagarh",
        "Nuapada",
        "Puri",
        "Rayagada",
        "Sambalpur",
        "Subarnapur",
        "Sundargarh",
      ],
      cities: [
        { name: "Bhubaneswar", multiplier: 0.9, avgCost: 1800 },
        { name: "Cuttack", multiplier: 0.8, avgCost: 1600 },
        { name: "Rourkela", multiplier: 0.8, avgCost: 1600 },
        { name: "Berhampur", multiplier: 0.7, avgCost: 1400 },
        { name: "Sambalpur", multiplier: 0.7, avgCost: 1400 },
      ],
    },
    Punjab: {
      districts: [
        "Amritsar",
        "Barnala",
        "Bathinda",
        "Faridkot",
        "Fatehgarh Sahib",
        "Fazilka",
        "Ferozepur",
        "Gurdaspur",
        "Hoshiarpur",
        "Jalandhar",
        "Kapurthala",
        "Ludhiana",
        "Mansa",
        "Moga",
        "Muktsar",
        "Nawanshahr",
        "Pathankot",
        "Patiala",
        "Rupnagar",
        "Sahibzada Ajit Singh Nagar",
        "Sangrur",
        "Tarn Taran",
      ],
      cities: [
        { name: "Ludhiana", multiplier: 1.0, avgCost: 2000 },
        { name: "Amritsar", multiplier: 0.9, avgCost: 1800 },
        { name: "Jalandhar", multiplier: 0.9, avgCost: 1800 },
        { name: "Patiala", multiplier: 0.8, avgCost: 1600 },
        { name: "Bathinda", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    Rajasthan: {
      districts: [
        "Ajmer",
        "Alwar",
        "Banswara",
        "Baran",
        "Barmer",
        "Bharatpur",
        "Bhilwara",
        "Bikaner",
        "Bundi",
        "Chittorgarh",
        "Churu",
        "Dausa",
        "Dholpur",
        "Dungarpur",
        "Hanumangarh",
        "Jaipur",
        "Jaisalmer",
        "Jalore",
        "Jhalawar",
        "Jhunjhunu",
        "Jodhpur",
        "Karauli",
        "Kota",
        "Nagaur",
        "Pali",
        "Pratapgarh",
        "Rajsamand",
        "Sawai Madhoper",
        "Sikar",
        "Sirohi",
        "Sri Ganganagar",
        "Tonk",
        "Udaipur",
      ],
      cities: [
        { name: "Jaipur", multiplier: 0.7, avgCost: 1400 },
        { name: "Jodhpur", multiplier: 0.6, avgCost: 1200 },
        { name: "Udaipur", multiplier: 0.7, avgCost: 1400 },
        { name: "Kota", multiplier: 0.6, avgCost: 1200 },
        { name: "Ajmer", multiplier: 0.6, avgCost: 1200 },
      ],
    },
    Sikkim: {
      districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
      cities: [
        { name: "Gangtok", multiplier: 1.2, avgCost: 2400 },
        { name: "Namchi", multiplier: 1.1, avgCost: 2200 },
      ],
    },
    "Tamil Nadu": {
      districts: [
        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar",
      ],
      cities: [
        { name: "Chennai", multiplier: 1.0, avgCost: 2000 },
        { name: "Coimbatore", multiplier: 0.9, avgCost: 1800 },
        { name: "Madurai", multiplier: 0.8, avgCost: 1600 },
        { name: "Salem", multiplier: 0.8, avgCost: 1600 },
        { name: "Tiruchirappalli", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    Telangana: {
      districts: [
        "Adilabad",
        "Bhadradri Kothagudem",
        "Hyderabad",
        "Jagtial",
        "Jangaon",
        "Jayashankar Bhupalpally",
        "Jogulamba Gadwal",
        "Kamareddy",
        "Karimnagar",
        "Khammam",
        "Komaram Bheem Asifabad",
        "Mahabubabad",
        "Mahabubnagar",
        "Mancherial",
        "Medak",
        "Medchal Malkajgiri",
        "Mulugu",
        "Nagarkurnool",
        "Nalgonda",
        "Narayanpet",
        "Nirmal",
        "Nizamabad",
        "Peddapalli",
        "Rajanna Sircilla",
        "Rangareddy",
        "Sangareddy",
        "Siddipet",
        "Suryapet",
        "Vikarabad",
        "Wanaparthy",
        "Warangal Rural",
        "Warangal Urban",
        "Yadadri Bhuvanagiri",
      ],
      cities: [
        { name: "Hyderabad", multiplier: 0.9, avgCost: 1800 },
        { name: "Warangal", multiplier: 0.7, avgCost: 1400 },
        { name: "Nizamabad", multiplier: 0.6, avgCost: 1200 },
        { name: "Karimnagar", multiplier: 0.6, avgCost: 1200 },
        { name: "Khammam", multiplier: 0.6, avgCost: 1200 },
      ],
    },
    Tripura: {
      districts: [
        "Dhalai",
        "Gomati",
        "Khowai",
        "North Tripura",
        "Sepahijala",
        "South Tripura",
        "Unakoti",
        "West Tripura",
      ],
      cities: [
        { name: "Agartala", multiplier: 0.9, avgCost: 1800 },
        { name: "Dharmanagar", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    "Uttar Pradesh": {
      districts: [
        "Agra",
        "Aligarh",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kheri",
        "Kushinagar",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Prayagraj",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamli",
        "Shrawasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi",
      ],
      cities: [
        { name: "Lucknow", multiplier: 0.6, avgCost: 1200 },
        { name: "Kanpur", multiplier: 0.6, avgCost: 1200 },
        { name: "Ghaziabad", multiplier: 1.0, avgCost: 2000 },
        { name: "Agra", multiplier: 0.7, avgCost: 1400 },
        { name: "Varanasi", multiplier: 0.6, avgCost: 1200 },
      ],
    },
    Uttarakhand: {
      districts: [
        "Almora",
        "Bageshwar",
        "Chamoli",
        "Champawat",
        "Dehradun",
        "Haridwar",
        "Nainital",
        "Pauri Garhwal",
        "Pithoragarh",
        "Rudraprayag",
        "Tehri Garhwal",
        "Udham Singh Nagar",
        "Uttarkashi",
      ],
      cities: [
        { name: "Dehradun", multiplier: 1.0, avgCost: 2000 },
        { name: "Haridwar", multiplier: 0.9, avgCost: 1800 },
        { name: "Nainital", multiplier: 1.1, avgCost: 2200 },
        { name: "Roorkee", multiplier: 0.8, avgCost: 1600 },
        { name: "Haldwani", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    "West Bengal": {
      districts: [
        "Alipurduar",
        "Bankura",
        "Birbhum",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Malda",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Bardhaman",
        "Paschim Medinipur",
        "Purba Bardhaman",
        "Purba Medinipur",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur",
      ],
      cities: [
        { name: "Kolkata", multiplier: 0.8, avgCost: 1600 },
        { name: "Howrah", multiplier: 0.8, avgCost: 1600 },
        { name: "Durgapur", multiplier: 0.7, avgCost: 1400 },
        { name: "Asansol", multiplier: 0.7, avgCost: 1400 },
        { name: "Siliguri", multiplier: 0.7, avgCost: 1400 },
      ],
    },
    Delhi: {
      districts: [
        "Central Delhi",
        "East Delhi",
        "New Delhi",
        "North Delhi",
        "North East Delhi",
        "North West Delhi",
        "Shahdara",
        "South Delhi",
        "South East Delhi",
        "South West Delhi",
        "West Delhi",
      ],
      cities: [
        { name: "Delhi", multiplier: 1.2, avgCost: 2400 },
        { name: "New Delhi", multiplier: 1.3, avgCost: 2600 },
        { name: "Gurgaon", multiplier: 1.3, avgCost: 2600 },
        { name: "Noida", multiplier: 1.1, avgCost: 2200 },
        { name: "Faridabad", multiplier: 1.0, avgCost: 2000 },
      ],
    },
    "Jammu and Kashmir": {
      districts: [
        "Anantnag",
        "Bandipora",
        "Baramulla",
        "Budgam",
        "Doda",
        "Ganderbal",
        "Jammu",
        "Kathua",
        "Kishtwar",
        "Kulgam",
        "Kupwara",
        "Poonch",
        "Pulwama",
        "Rajouri",
        "Ramban",
        "Reasi",
        "Samba",
        "Shopian",
        "Srinagar",
        "Udhampur",
      ],
      cities: [
        { name: "Srinagar", multiplier: 1.0, avgCost: 2000 },
        { name: "Jammu", multiplier: 0.9, avgCost: 1800 },
        { name: "Anantnag", multiplier: 0.8, avgCost: 1600 },
      ],
    },
    Ladakh: {
      districts: ["Kargil", "Leh"],
      cities: [
        { name: "Leh", multiplier: 1.3, avgCost: 2600 },
        { name: "Kargil", multiplier: 1.2, avgCost: 2400 },
      ],
    },
  }

  const availableDistricts = state ? indianStatesDistricts[state]?.districts || [] : []
  const availableCities = state ? indianStatesDistricts[state]?.cities || [] : []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAnalysis(true)
  }

  const handleProceedToDashboard = () => {
    if (onDetailedData) {
      onDetailedData({
        budget,
        sqft,
        bedrooms,
        bathrooms,
        state,
        city,
        constructionType,
        qualityLevel,
        floors,
        plotSize,
        hasKitchen,
        hasBalcony,
        hasGarden,
      })
    }
    if (onBack) {
      const budgetInfo = {
        budget: `₹${Number.parseInt(budget || "0").toLocaleString()}`,
        area: `${sqft} sq ft`,
        rooms: `${bedrooms} BHK`,
      }
      onBack(budgetInfo)
    }
  }

  const selectedCityData = availableCities.find((c) => c.name === city)
  const estimatedCost = selectedCityData && sqft ? Number.parseInt(sqft) * selectedCityData.avgCost : 0
  const budgetGap = budget ? Number.parseInt(budget) - estimatedCost : 0
  const budgetStatus = budgetGap >= 0 ? "sufficient" : "insufficient"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">EasyConstruct</h1>
          </div>
          <h2 className="text-3xl font-bold text-balance mb-2">Smart Budget & Project Planner</h2>
          <p className="text-muted-foreground text-pretty">
            Get AI-powered Budget Estimation  with real-time regional pricing across India
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Project Details
              </CardTitle>
              <CardDescription>Enter comprehensive details for accurate Budget estimation</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Construction Location
                  </Label>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={state}
                        onValueChange={(value) => {
                          setState(value)
                          setDistrict("")
                          setCity("")
                        }}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(indianStatesDistricts).map((stateName) => (
                            <SelectItem key={stateName} value={stateName}>
                              {stateName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Select value={district} onValueChange={setDistrict} disabled={!state} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDistricts.map((districtName) => (
                            <SelectItem key={districtName} value={districtName}>
                              {districtName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select value={city} onValueChange={setCity} disabled={!state} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCities.map((cityData) => (
                            <SelectItem key={cityData.name} value={cityData.name}>
                              {cityData.name} - ₹{cityData.avgCost}/sq ft
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Budget and Area */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Total Budget (₹)</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., 2500000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sqft">Built-up Area (sq ft)</Label>
                    <Input
                      id="sqft"
                      placeholder="e.g., 1200"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Plot and Construction Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plotSize">Plot Size</Label>
                    <Input
                      id="plotSize"
                      placeholder="e.g., 2400"
                      value={plotSize}
                      onChange={(e) => setPlotSize(e.target.value)}
                      required
                    />
                    {plotSizeSqft > 0 && (
                      <div className="text-xs text-muted-foreground">
                        = {plotSizeSqft.toLocaleString()} sq ft ≈ {plotSizeCents} cents
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Select value={floors} onValueChange={setFloors} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select floors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Ground Floor (G)</SelectItem>
                        <SelectItem value="2">Ground + 1 (G+1)</SelectItem>
                        <SelectItem value="3">Ground + 2 (G+2)</SelectItem>
                        <SelectItem value="4">Ground + 3 (G+3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Construction Type and Quality */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="constructionType">Construction Type</Label>
                    <Select value={constructionType} onValueChange={setConstructionType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New Construction</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                        <SelectItem value="extension">Extension</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualityLevel">Quality Level</Label>
                    <Select value={qualityLevel} onValueChange={setQualityLevel} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (₹1200-1600/sq ft)</SelectItem>
                        <SelectItem value="standard">Standard (₹1600-2200/sq ft)</SelectItem>
                        <SelectItem value="premium">Premium (₹2200-3000/sq ft)</SelectItem>
                        <SelectItem value="luxury">Luxury (₹3000+/sq ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Room Configuration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={bedrooms} onValueChange={setBedrooms} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 BHK</SelectItem>
                        <SelectItem value="2">2 BHK</SelectItem>
                        <SelectItem value="3">3 BHK</SelectItem>
                        <SelectItem value="4">4 BHK</SelectItem>
                        <SelectItem value="5">5+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select value={bathrooms} onValueChange={setBathrooms} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="4">4+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Features */}
                <div className="space-y-4">
                  <Label>Additional Features</Label>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="kitchen"
                        checked={hasKitchen}
                        onChange={(e) => setHasKitchen(e.target.checked)}
                        className="rounded border-border"
                      />
                      <Label htmlFor="kitchen">Modular Kitchen</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="balcony"
                        checked={hasBalcony}
                        onChange={(e) => setHasBalcony(e.target.checked)}
                        className="rounded border-border"
                      />
                      <Label htmlFor="balcony">Balcony</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="garden"
                        checked={hasGarden}
                        onChange={(e) => setHasGarden(e.target.checked)}
                        className="rounded border-border"
                      />
                      <Label htmlFor="garden">Garden/Terrace</Label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Calculator className="h-4 w-4 mr-2" />
                  Analyze Budget & Generate Plan
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Real-time Cost Analysis */}
          {showAnalysis && selectedCityData && (
            <Card className="lg:sticky lg:top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Smart Cost Analysis
                </CardTitle>
                <CardDescription>AI-powered budget breakdown for {city}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Budget Status</span>
                    {budgetStatus === "sufficient" ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Sufficient
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Needs Review
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Your Budget</span>
                      <span className="font-semibold">₹{Number.parseInt(budget || "0").toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Estimated Cost</span>
                      <span className="font-semibold">₹{estimatedCost.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className={budgetGap >= 0 ? "text-green-600" : "text-red-600"}>
                        {budgetGap >= 0 ? "Surplus" : "Shortfall"}
                      </span>
                      <span className={`font-semibold ${budgetGap >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ₹{Math.abs(budgetGap).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Progress
                    value={budget && estimatedCost ? Math.min((Number.parseInt(budget) / estimatedCost) * 100, 100) : 0}
                    className="h-2"
                  />
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Estimated Cost Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Materials (45%)</span>
                      <span className="font-medium">₹{Math.round(estimatedCost * 0.45).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Labor (30%)</span>
                      <span className="font-medium">₹{Math.round(estimatedCost * 0.3).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Contractor (15%)</span>
                      <span className="font-medium">₹{Math.round(estimatedCost * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Permits & Misc (10%)</span>
                      <span className="font-medium">₹{Math.round(estimatedCost * 0.1).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Regional Comparison */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Regional Price Comparison</h4>
                  <div className="space-y-2">
                    {availableCities.slice(0, 5).map((cityData) => (
                      <div key={cityData.name} className="flex justify-between items-center text-sm">
                        <span className={cityData.name === city ? "font-semibold text-primary" : ""}>
                          {cityData.name}
                        </span>
                        <span className={cityData.name === city ? "font-semibold text-primary" : ""}>
                          ₹{cityData.avgCost}/sq ft
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Smart Recommendations */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Smart Recommendations</h4>
                  <div className="space-y-2">
                    {budgetGap < 0 && selectedCityData && (
                      <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          Consider reducing area by {Math.ceil(Math.abs(budgetGap) / selectedCityData.avgCost)} sq ft or
                          opt for basic quality materials.
                        </p>
                      </div>
                    )}
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Best construction season: October to March for optimal weather conditions in {state}.
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleProceedToDashboard} className="w-full" size="lg">
                  Proceed to Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
