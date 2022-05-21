INSERT INTO department
    (name)
VALUES
    ('Accounting'),
    ('IT'),
    ('Marketing'),
    ('HR'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Controller', 150000, 1),
    ('Head of IT',190000, 2),
    ('Systems Analyst', 90000, 2),
    ('Product Owner', 100000, 3),
    ('Recruiter', 75000, 4),
    ('Legal Counsel', 130000, 5);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jane', 'Doe', 1, NULL),
    ('Jack', 'Tripper', 4, NULL),
    ('Tipper', 'Gore', 4, NULL),
    ('Alan', 'Hansen', 5, NULL),
    ('Jurgen', 'Klopp', 2, NULL),
    ('Pep', 'Fraudiola', 3, 5);

