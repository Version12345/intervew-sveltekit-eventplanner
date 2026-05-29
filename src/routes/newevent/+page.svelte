<script lang="ts">

</script>

<form method="POST">
    <!-- form for creating new event -->
    <label for="title">Title</label>
    <input type="text" id="title" name="title" required>
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description"></textarea>
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" required>
    <button type="submit">Create Event</button>
</form>