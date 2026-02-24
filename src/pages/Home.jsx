import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className="home-page">
        <section className="home-hero home-animate-in">
          <h1 className="home-hero__title">
            <span className="home-hero__emoji" aria-hidden>🎓</span>
            Student learning outcomes platform
          </h1>
          <p className="home-hero__text">
            Track and manage student learning outcomes. Monitor assessment data, academic progress, and performance metrics to support student achievement.
          </p>
          <div className="home-hero__actions">
            <Link to="/login" className="home-hero__btn home-hero__btn--primary">Sign in</Link>
            <Link to="/signup" className="home-hero__btn home-hero__btn--secondary">Create account</Link>
          </div>
        </section>

        <section className="home-section home-animate-in home-animate-in--2">
          <h2 className="home-section__title">Built for your role</h2>
          <div className="home-audience">
            <div className="home-audience__item">
              <span className="home-audience__icon" aria-hidden>📄</span>
              <h3 className="home-audience__title">Students (User)</h3>
              <p className="home-audience__text">
                View learning outcomes, monitor progress, and identify areas for improvement. Submit work, see marks and feedback.
              </p>
            </div>
            <div className="home-audience__item">
              <span className="home-audience__icon" aria-hidden>✏️</span>
              <h3 className="home-audience__title">Admin (Teacher)</h3>
              <p className="home-audience__text">
                Track assessment data, analyze learning outcomes, and generate reports. Enter marks and view all submissions.
              </p>
            </div>
            <div className="home-audience__item">
              <span className="home-audience__icon" aria-hidden>📊</span>
              <h3 className="home-audience__title">Programme & quality</h3>
              <p className="home-audience__text">
                Dashboards and reports by student and course. Evaluate educational effectiveness and support student achievement.
              </p>
            </div>
          </div>
        </section>

        <section className="home-section home-animate-in home-animate-in--3">
          <h2 className="home-section__title">Three steps</h2>
          <div className="home-steps">
            <div className="home-step">
              <div className="home-step__number">1</div>
              <h3 className="home-step__title">Submit</h3>
              <p className="home-step__desc">
                Upload with course, ID, and file. Timestamp and confirmation saved.
              </p>
            </div>
            <div className="home-step">
              <div className="home-step__number">2</div>
              <h3 className="home-step__title">Grade</h3>
              <p className="home-step__desc">
                Faculty open submissions, enter marks. Grader name stored automatically.
              </p>
            </div>
            <div className="home-step">
              <div className="home-step__number">3</div>
              <h3 className="home-step__title">Report</h3>
              <p className="home-step__desc">
                Dashboard and reports show counts, status, and full data for assessment.
              </p>
            </div>
          </div>
        </section>

        <section className="home-section home-features home-animate-in home-animate-in--4">
          <h2 className="home-section__title">Everything in one place</h2>
          <div className="home-feature-grid">
            <article className="home-feature">
              <h3 className="home-feature__title">Dashboard & charts</h3>
              <p className="home-feature__text">
                Totals, marked vs pending, and visual breakdowns so you can monitor workload and completion.
              </p>
            </article>
            <article className="home-feature">
              <h3 className="home-feature__title">Reports</h3>
              <p className="home-feature__text">
                Full submission list with ID, name, course, file, marks, and grader—plus registration stats by department.
              </p>
            </article>
            <article className="home-feature">
              <h3 className="home-feature__title">Submit & track</h3>
              <p className="home-feature__text">
                Students add course, ID, name, and file. See marks and who graded in My submissions.
              </p>
            </article>
            <article className="home-feature">
              <h3 className="home-feature__title">Marking</h3>
              <p className="home-feature__text">
                One table, search by name or ID. Enter or update marks; today’s submissions highlighted.
              </p>
            </article>
            <article className="home-feature">
              <h3 className="home-feature__title">Graded-by</h3>
              <p className="home-feature__text">
                Every submission stores the faculty member who assigned the grade—visible to students and in reports.
              </p>
            </article>
            <article className="home-feature">
              <h3 className="home-feature__title">Secure & role-based</h3>
              <p className="home-feature__text">
                Students see their work; faculty see all and can mark; dashboard and reports available as configured.
              </p>
            </article>
          </div>
        </section>

        <section className="home-cta home-animate-in home-animate-in--5">
          <h2 className="home-cta__title">Get started</h2>
          <p className="home-cta__text">
            Sign in or create an account to submit assignments, enter marks, or view dashboard and reports.
          </p>
          <div className="home-cta__buttons">
            <Link to="/login" className="home-hero__btn home-hero__btn--primary">Sign in</Link>
            <Link to="/signup" className="home-hero__btn home-hero__btn--secondary">Create account</Link>
          </div>
        </section>

        <footer className="home-footer home-animate-in home-animate-in--6">
          <p className="home-footer__brand">Student Monitoring System</p>
          <p className="home-footer__tagline">Assignment submission, grading, and outcome reporting for institutions.</p>
          <nav className="home-footer__nav">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/report">Report</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </nav>
        </footer>
      </div>
    </MainLayout>
  );
}

export default Home;
