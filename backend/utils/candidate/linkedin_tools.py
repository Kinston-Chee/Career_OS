import asyncio
from linkedin_scraper import BrowserManager, PersonScraper

from linkedin_scraper import BrowserManager, login_with_credentials
import os
from dotenv import load_dotenv

load_dotenv()

async def login():
    async with BrowserManager(headless=False) as browser:
        # Login with credentials
        await login_with_credentials(
            browser.page,
            email=os.getenv("LINKEDIN_EMAIL"),
            password=os.getenv("LINKEDIN_PASSWORD")
        )
        
        # Save session for reuse
        await browser.save_session("session.json")

asyncio.run(login())

async def main():
    # Initialize browser
    async with BrowserManager(headless=False) as browser:
        # Load authenticated session
        await browser.load_session("session.json")
        
        # Create scraper
        scraper = PersonScraper(browser.page)
        
        # Scrape a profile
        person = await scraper.scrape("www.linkedin.com/in/tan-ying-shien/")
        
        # Access data
        print(f"Name: {person.name}")
        print(f"Headline: {person.headline}")
        print(f"Location: {person.location}")
        print(f"Experiences: {len(person.experiences)}")
        print(f"Education: {len(person.educations)}")

asyncio.run(main())