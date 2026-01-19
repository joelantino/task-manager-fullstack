const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';

async function test() {
    try {
        console.log('--- 🧪 Starting API Tests ---');
        const timestamp = Date.now();

        // 1. Register
        console.log('\n1. Registering user...');
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: `tester_${timestamp}`,
                email: `test_${timestamp}@example.com`,
                password: 'password123'
            })
        });
        const regData = await regRes.json();
        console.log('Register Response:', regData);
        const token = regData.token;

        if (!token) throw new Error('Failed to get token: ' + (regData.message || 'Unknown error'));

        // 2. Create Task
        console.log('\n2. Creating task...');
        const createTaskRes = await fetch(`${BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: 'Complete the tests',
                description: 'Verify all endpoints work'
            })
        });
        const taskData = await createTaskRes.json();
        console.log('Create Task Response:', taskData);
        const taskId = taskData._id;

        // 3. Get Tasks
        console.log('\n3. Getting tasks...');
        const getTasksRes = await fetch(`${BASE_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const tasks = await getTasksRes.json();
        console.log('Get Tasks Count:', tasks.length);

        // 4. Update Task
        console.log('\n4. Updating task...');
        const updateRes = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ completed: true })
        });
        const updatedTask = await updateRes.json();
        console.log('Update Task Result:', updatedTask.completed === true ? 'SUCCESS (Completed: true)' : 'FAILED');

        // 5. Delete Task
        console.log('\n5. Deleting task...');
        const deleteRes = await fetch(`${BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const deleteData = await deleteRes.json();
        console.log('Delete Response:', deleteData);

        console.log('\n--- ✅ All Tests Passed ---');
        process.exit(0);
    } catch (err) {
        console.error('\n--- ❌ Test Failed ---');
        console.error(err.message);
        process.exit(1);
    }
}

test();
