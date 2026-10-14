"""Zero-config SQLite storage for Jiyaan Institute.

The database file is created automatically on first run, and the tables are
seeded with starter content. Nothing needs to be installed or configured.
"""
import sqlite3
from datetime import date
from contextlib import contextmanager
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "data" / "jiyaan.db"

SCHEMA = """
CREATE TABLE IF NOT EXISTS courses (
    id          INTEGER PRIMARY KEY,
    title       TEXT NOT NULL,
    summary     TEXT NOT NULL,
    icon        TEXT NOT NULL,
    duration    TEXT NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS batches (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    mode        TEXT NOT NULL,
    start_date  TEXT NOT NULL,
    timing      TEXT NOT NULL,
    seats_left  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS pricing_plans (
    id          INTEGER PRIMARY KEY,
    name        TEXT NOT NULL,
    price_inr   INTEGER NOT NULL,
    original_inr INTEGER,
    duration    TEXT NOT NULL,
    features    TEXT NOT NULL,
    highlight   INTEGER NOT NULL DEFAULT 0,
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
    id          INTEGER PRIMARY KEY,
    quote       TEXT NOT NULL,
    name        TEXT NOT NULL,
    role        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       TEXT,
    message     TEXT NOT NULL,
    course      TEXT,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
"""

COURSES = [
    ("SQL Fundamentals", "Database basics, SQL queries, data manipulation and query optimisation.", "database", "Days 1-15", 1),
    ("Python & Data Processing", "Programming, data structures, Pandas and NumPy for real datasets.", "table", "Days 16-30", 2),
    ("Big Data & PySpark", "Distributed computing with Hadoop and Spark, plus data modelling.", "cluster", "Days 31-46", 3),
    ("GCP Cloud Platform", "Cloud services with BigQuery, Dataflow and Pub/Sub, built into real pipelines.", "flow", "Days 47-60", 4),
    ("DevOps & Tools", "Linux, Git, Jira, CI/CD pipelines and engineering best practices.", "stream", "Days 61-76", 5),
    ("Interview & Job Ready", "Resume building, mock interviews, portfolio review and placement preparation.", "cert", "Days 77-90", 6),
]

BATCHES = [
    ('February Batch', 'Online + recorded', '2027-02-08', 'Sat & Sun, 10:00 - 13:00 IST', 30),
    ('June Batch', 'Online + recorded', '2027-06-07', 'Mon - Fri, 19:30 - 21:30 IST', 30),
    ('October Batch', 'Online + recorded', '2027-10-04', 'Tue & Thu, 20:00 - 22:00 IST', 30),
]

PRICING = [
    ('Self-Paced', 14999, 19999, 'Lifetime access', 'All recorded modules, Hands-on live class, No placement/interview support, No job support', 0, 1),
    ('Live Online Batch', 34999, 44999, '12 weeks', 'Live instructor classes, Weekly hands-on labs, Mock exams, Resume and interview prep, Placement/interview support, Job support', 1, 2),
    ('Career Accelerator', 59999, 79999, '16 weeks', 'Everything in Live Online, One-to-one mentoring, Capstone project with GCP credits, Placement assistance, Mock interviews', 0, 3),
]

TESTIMONIALS = [
    ("BigQuery optimization and Dataflow training got me TCS placement. Mentors' real-world experience made complex concepts simple.", "K Ayyappareddy", "Data Engineer @ TCS"),
    ("GCP fundamentals to advanced - this course covered everything TCS needed. Certified and placed with 150% salary hike!", "B Rajasekhar", "Cloud Data Engineer @ TCS"),
    ("From zero cloud experience to Data Engineer at Capgemini. SQL and PySpark modules were exactly what the interview needed!", "G Bhavani", "Data Engineer @ Capgemini"),
    ("Hands-on Dataflow projects and BigQuery deep-dives gave me confidence. Now building cloud pipelines at Capgemini!", "J Himaja", "GCP Data Engineer @ Capgemini"),
    ("Best decision ever! Placement support team got me interview at Capgemini and negotiated a great package.", "K Phani", "Cloud Data Specialist @ Capgemini"),
    ("From non-technical background to building production pipelines at Capgemini. Dream job realized!", "R Leelavathi", "Data Pipeline Engineer @ Capgemini"),
    ("Real-world Airflow and SQL projects prepared me perfectly. Salary tripled compared to previous role!", "G Karthik", "Data Engineer @ Capgemini"),
    ("The comprehensive GCP training and leadership modules prepared me for senior consultant role at Capgemini. Exceptional ROI!", "K Manish", "Senior Consultant @ Capgemini"),
    ("Interview focused on BigQuery and optimization - exactly our curriculum. Placed on first attempt!", "P Bhanu", "GCP Data Engineer @ HCL"),
    ("From Python basics to GCP Data Engineer at HCL. This course accelerated career by 5 years!", "A Sainadh", "Data Pipeline Engineer @ HCL"),
    ("Structured curriculum and 1:1 doubt sessions made all the difference. HCL hired me on the spot!", "CH Sivannarayana", "Data Engineer @ HCL"),
    ("IBM's role required cloud architecture knowledge. Course provided exactly that. Promoted within a year!", "Ramesh Varma N", "Data Engineer @ IBM"),
    ("BigQuery and cloud architecture modules helped in IBM's interviews. Now designing data solutions for enterprise clients!", "A Phaneendra", "GCP Data Architect @ IBM"),
    ("TechM's GCP projects require solid fundamentals. Course provided exactly that. 180% salary jump!", "A Phalgun", "Data Engineer @ Tech Mahindra"),
    ("Support engineer to Data Engineer transition made possible by placement support. Grateful!", "G Ashok", "Cloud Data Engineer @ Tech Mahindra"),
    ("Interview focused on real-world pipelines. Hands-on Dataflow projects gave confidence for any question!", "P Lohith", "Data Engineer @ Accenture"),
    ("EY looking for GCP + legacy systems expertise. Course covered both aspects beautifully!", "Pavan Sai B", "Data Engineer @ EY"),
    ("Altimetrik values hands-on GCP experience. Real projects and mentorship placed me in role I love!", "C Chandra Sekhar", "Data Engineer @ Altimetrik"),
    ("Fresher to Data Engineer at Ascendion thanks to structured approach and placement support!", "Sivakrishna M", "GCP Data Engineer @ Ascendion"),
    ("Quantiphi specialist - advanced modules prepared me for challenging role. Leading data projects!", "Ashok G", "Senior Data Engineer @ Quantiphi"),
    ("Quantiphi interview was GCP expertise focused. Perfect match for what I learned here!", "R Syam", "Data Engineer @ Quantiphi"),
    ("Architecture role required deep GCP knowledge. Advanced modules were game-changing!", "A Phalgun", "Data Pipeline Architect @ Persistent"),
    ("Interview asked about real data engineering challenges. Real-world projects prepared me well!", "A Phalgun", "Data Engineer @ Infinite"),
    ("Role required SQL + cloud expertise. Course covered both comprehensively!", "T Sai Pranav", "Cloud Data Engineer @ Dun & Bradstreet"),
    ("HumanCloud values hands-on GCP experience. Practical projects got me placed in desired role!", "Tarun B", "Data Engineer @ HumanCloud"),
    ("9nexus's dynamic startup environment needed hands-on data engineers with GCP expertise. This course prepared me perfectly!", "K Ravi Kiran", "Data Engineer @ 9nexus"),
    ("High technical bar, but mentorship prepared me to exceed expectations!", "Phani Kumar", "Data Engineer @ Programming Minds"),
    ("Fast-paced environment needed solid GCP fundamentals and quick learning. Perfect fit!", "Ramarao Nunna", "Data Engineer @ Photon"),
    ("Thorough interview process met with comprehensive training confidence!", "Sri Krishna Y", "Data Engineer @ SQSHFT"),
    ("TECH T7 values innovation and cloud expertise. Advanced curriculum aligned perfectly!", "Teja S", "Cloud Data Engineer @ TECH T7"),
    ("Role required quick learning and adaptability. Real-world projects taught me both!", "Vijay Bhaskara N", "Data Engineer @ Techila"),
    ("Startup needed hands-on data engineers. Practical training made me production-ready!", "D Charan", "Data Engineer @ UpwardIQ"),
    ("Challenging interview met with excellent mock interview prep. Ready for anything!", "K Sri Harsha", "Data Engineer @ VSPL"),
    ("Advanced GCP architecture modules and mentorship took my career to senior level. Leading cloud infrastructure at Crown Solution!", "B Srinu", "Senior GCP Engineer @ Crown Solution"),
    ("From basics to production-ready data engineer. This course's hands-on approach and mentorship made all the difference in my career!", "P Amarnath", "GCP Data Engineer"),
    ('I am very happy to share that I have received an offer from TCS as a Data Engineer. A big thank you to Jiyaan Institute for giving me the right guidance, support, and confidence to improve my skills.', 'Jiyaan learner', 'Data Engineer @ TCS'),
    ('I am very happy to share that I have received an offer from Deloitte as a Lead Data Engineer. A big thank you to Jiyaan Institute for giving me the right guidance, support, and confidence to improve my skills.', 'Jiyaan learner', 'Lead Data Engineer @ Deloitte'),
    ('I have received an offer from HCL as a Data & AI Engineer. A big thank you to Jiyaan Institute for giving me the right guidance, support, and confidence to improve my skills.', 'Jiyaan learner', 'Data & AI Engineer @ HCL'),
    ('I am delighted to share that I have received an offer from Tech sys as a senior data engineer. A heartfelt thank you to Jiyaan Institute for providing excellent guidance, continuous support, and the right platform to build my skills and confidence.', 'A Venkata Kiran', 'Senior Data Engineer @ Tech sys'),
    ('Successfully secured a job offer from Deloitte with a package of 12 LPA! Thank you all for your constant support in making this achievement possible.', 'Kiran', 'Data Engineer @ Deloitte'),
    ("I've been selected for a senior consultant - GCP role at AbsoluteLabs! This achievement means a lot to me, and I'm truly grateful to Jiyaan Institute for the right guidance, training, and support.", 'Jiyaan learner', 'Senior Consultant - GCP @ Absolute Labs Consulting'),
    ('I am delighted to share that I have received an offer from Tata Consultancy Services (TCS) as an IT Analyst. A heartfelt thank you to Jiyaan Institute for providing excellent guidance, continuous support, and the right platform to build my skills and confidence.', 'C Manoj Kumar Varma', 'IT Analyst @ TCS'),
    ("I'm overflowing with gratitude to share that I've been selected for a GCP Data Engineer role at TCS! I genuinely couldn't have reached this milestone without you.", 'Jiyaan learner', 'GCP Data Engineer @ TCS'),
    ('Your help and motivation have played a major role in helping me grow and secure a better opportunity with a Top 4 company (Deloitte).', 'Jiyaan learner', 'Learner @ Deloitte'),
    ('Got selected in Tech Mahindra. Thank you Satish, Lohith and Shiva bro.', 'Jiyaan learner', 'Learner @ Tech Mahindra'),
    ("I have received two job offers from HCLTech and Capgemini today and I'm truly grateful to everyone who supported me throughout this journey.", 'T Chittala', 'Job offers @ HCLTech & Capgemini'),
    ("I'm delighted and grateful to share that I have been selected for a Data Engineer role at Capgemini! I'm truly thankful to everyone who supported, guided, and encouraged me throughout this journey.", 'Jiyaan learner', 'Data Engineer @ Capgemini'),
    ("I have received a job offer from HCLTech today! This is a very special moment in my career, and I'm truly grateful to everyone who supported me throughout this journey.", 'V Dombale', 'Batch 10 learner @ HCLTech'),
    ("I've received an offer from Deloitte. This is a very special milestone for me, and I'm truly thankful to everyone who supported me throughout this journey.", 'Jiyaan learner', 'Learner @ Deloitte'),
]


@contextmanager
def get_connection():
    """Yield a connection that commits on success and is always closed.

    sqlite3's own context manager only commits, so it would leave the file open.
    """
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    """Create tables and seed starter content when the tables are empty."""
    with get_connection() as conn:
        conn.executescript(SCHEMA)
        # Add the course column to databases created before it existed.
        columns = {row["name"] for row in conn.execute("PRAGMA table_info(enquiries)")}
        if "course" not in columns:
            conn.execute("ALTER TABLE enquiries ADD COLUMN course TEXT")
        if conn.execute("SELECT COUNT(*) FROM courses").fetchone()[0] == 0:
            conn.executemany(
                "INSERT INTO courses (title, summary, icon, duration, sort_order) VALUES (?, ?, ?, ?, ?)",
                COURSES,
            )
        if conn.execute("SELECT COUNT(*) FROM batches").fetchone()[0] == 0:
            conn.executemany(
                "INSERT INTO batches (name, mode, start_date, timing, seats_left) VALUES (?, ?, ?, ?, ?)",
                BATCHES,
            )
        if conn.execute("SELECT COUNT(*) FROM pricing_plans").fetchone()[0] == 0:
            conn.executemany(
                "INSERT INTO pricing_plans (name, price_inr, original_inr, duration, features, highlight, sort_order) "
                "VALUES (?, ?, ?, ?, ?, ?, ?)",
                PRICING,
            )
        roll_over_batches(conn)
        if conn.execute("SELECT COUNT(*) FROM testimonials").fetchone()[0] == 0:
            conn.executemany(
                "INSERT INTO testimonials (quote, name, role) VALUES (?, ?, ?)",
                TESTIMONIALS,
            )


def roll_over_batches(conn):
    """Move any batch whose start date has passed to the same date next year."""
    today = date.today().isoformat()
    rows = conn.execute("SELECT id, start_date FROM batches").fetchall()
    for row in rows:
        if row["start_date"] < today:
            next_year = str(int(row["start_date"][:4]) + 1) + row["start_date"][4:]
            conn.execute(
                "UPDATE batches SET start_date = ?, seats_left = 30 WHERE id = ?",
                (next_year, row["id"]),
            )
